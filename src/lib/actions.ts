'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

export async function addToCart(userId: number, productId: number) {
  try {
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add to cart' };
  }
}

export async function toggleWishlist(userId: number, productId: number) {
  try {
    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
    } else {
      await prisma.wishlist.create({ data: { userId, productId } });
    }

    revalidatePath('/wishlist');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return { success: false };
  }
}
export async function removeFromCart(cartItemId: number) {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false };
  }
}

export async function processCheckout(userId: number, transactionId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) return { success: false, error: 'Cart is empty' };

    const totalAmount = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) + 20; // +20 shipping

    // Create Order with PENDING_VERIFICATION status
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'PENDING_VERIFICATION',
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    });

    // Clear Cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    // Send Receipt Notification with Transaction ID
    await prisma.notification.create({
      data: {
        userId,
        message: `Order #${order.id} placed. Status: Pending Verification. Transaction ID: ${transactionId}. Admin will verify your payment of $${totalAmount.toFixed(2)} shortly.`
      }
    });

    revalidatePath('/', 'layout');
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Checkout error:', error);
    return { success: false, error: 'Checkout failed' };
  }
}

export async function returnOrder(orderId: number) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'RETURNED_REFUNDED' }
    });

    // Send Refund Notification
    await prisma.notification.create({
      data: {
        userId: order.userId,
        message: `Refund Processed: $${order.totalAmount.toFixed(2)} has been refunded to your original payment account for Order #${order.id}.`
      }
    });

    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Return error:', error);
    return { success: false };
  }
}

export async function approveOrder(orderId: number) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'PAID' }
    });

    await prisma.notification.create({
      data: {
        userId: order.userId,
        message: `Your payment for Order #${order.id} has been verified! We are now processing your order.`
      }
    });

    revalidatePath('/admin/orders');
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Approve error:', error);
    return { success: false };
  }
}

export async function registerUser(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: 'Email already exists' };

    const passwordHash = await require('bcryptjs').hash(password, 10);
    await prisma.user.create({
      data: { fullName, email, passwordHash, role: 'USER' }
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to create account' };
  }
}
