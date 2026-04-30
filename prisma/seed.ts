import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.adminLog.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderTracking.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.address.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@ecommerce.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const vendorUser = await prisma.user.create({
    data: {
      fullName: 'John Vendor',
      email: 'vendor@ecommerce.com',
      passwordHash,
      role: 'VENDOR',
    },
  });

  const customer = await prisma.user.create({
    data: {
      fullName: 'Jane Customer',
      email: 'customer@ecommerce.com',
      passwordHash,
      role: 'USER',
    },
  });

  // Create Vendors
  const mainVendor = await prisma.vendor.create({
    data: {
      vendorName: 'Global Electronics',
      email: 'sales@globalelectronics.com',
      phone: '1234567890',
    },
  });

  // Create Categories with Images
  const electronics = await prisma.category.create({
    data: {
      categoryName: 'Electronics',
      description: 'Gadgets, devices and more',
      imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    },
  });

  const fashion = await prisma.category.create({
    data: {
      categoryName: 'Fashion',
      description: 'Clothing and accessories',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    },
  });

  const books = await prisma.category.create({
    data: {
      categoryName: 'Books',
      description: 'Novels, textbooks, and literature',
      imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
    },
  });

  const home = await prisma.category.create({
    data: {
      categoryName: 'Home & Kitchen',
      description: 'Decor, furniture, and appliances',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80',
    },
  });

  // Create Products
  const products = [
    // Electronics
    {
      name: 'iPhone 15 Pro',
      description: 'The latest iPhone with titanium design',
      price: 999.99,
      stock: 50,
      categoryId: electronics.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80'
    },
    {
      name: 'MacBook Air M3',
      description: 'Supercharged by M3 chip',
      price: 1199.99,
      stock: 30,
      categoryId: electronics.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80'
    },
    {
      name: 'Wireless Noise Cancelling Headphones',
      description: 'Premium sound quality',
      price: 299.99,
      stock: 45,
      categoryId: electronics.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'
    },
    
    // Fashion
    {
      name: 'Premium Leather Jacket',
      description: '100% genuine leather jacket',
      price: 199.99,
      stock: 20,
      categoryId: fashion.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80'
    },
    {
      name: 'Classic White Sneakers',
      description: 'Comfortable everyday wear',
      price: 79.99,
      stock: 100,
      categoryId: fashion.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80'
    },

    // Books
    {
      name: 'The Great Gatsby',
      description: 'Classic novel by F. Scott Fitzgerald',
      price: 14.99,
      stock: 200,
      categoryId: books.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80'
    },
    {
      name: 'Clean Code',
      description: 'A Handbook of Agile Software Craftsmanship',
      price: 45.99,
      stock: 50,
      categoryId: books.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80'
    },
    {
      name: 'Dune',
      description: 'Science fiction masterpiece by Frank Herbert',
      price: 19.99,
      stock: 120,
      categoryId: books.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80'
    },

    // Home
    {
      name: 'Ceramic Coffee Mug',
      description: 'Handcrafted ceramic mug',
      price: 12.99,
      stock: 80,
      categoryId: home.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80'
    },
    {
      name: 'Modern Table Lamp',
      description: 'Minimalist design for your desk',
      price: 49.99,
      stock: 40,
      categoryId: home.id,
      vendorId: mainVendor.id,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80'
    }
  ];

  for (const productData of products) {
    const { image, ...product } = productData;
    const createdProduct = await prisma.product.create({
      data: product,
    });

    await prisma.productImage.create({
      data: {
        productId: createdProduct.id,
        imageUrl: image,
      },
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
