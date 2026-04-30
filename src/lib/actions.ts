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

    revalidatePath('/cart');
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
