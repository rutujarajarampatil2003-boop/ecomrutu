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
  await prisma.user.create({
    data: { fullName: 'Admin User', email: 'admin@ecommerce.com', passwordHash, role: 'ADMIN' },
  });

  // Create Vendors
  const mainVendor = await prisma.vendor.create({
    data: { vendorName: 'Global Mega Store', email: 'sales@globalmegastore.com', phone: '1234567890' },
  });

  // Create Categories
  const categoriesData = [
    { name: 'Electronics', desc: 'Smartphones, Laptops, and Gadgets', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80' },
    { name: 'Fashion', desc: 'Trendy Clothing and Accessories', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80' },
    { name: 'Books', desc: 'Novels, Biographies, and Educational', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80' },
    { name: 'Home & Kitchen', desc: 'Furniture, Decor, and Appliances', img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80' },
    { name: 'Sports & Outdoors', desc: 'Fitness Gear and Outdoor Equipment', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80' },
    { name: 'Beauty & Personal Care', desc: 'Skincare, Makeup, and Grooming', img: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=800&q=80' },
    { name: 'Toys & Games', desc: 'Fun and Educational Toys for Kids', img: 'https://images.unsplash.com/photo-1558060370-d64111d52c14?w=800&q=80' },
    { name: 'Groceries', desc: 'Daily Essentials and Fresh Produce', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80' },
  ];

  const dbCategories: any = {};
  for (const cat of categoriesData) {
    dbCategories[cat.name] = await prisma.category.create({
      data: { categoryName: cat.name, description: cat.desc, imageUrl: cat.img },
    });
  }

  // Define Products
  const products = [
    // Electronics
    { name: 'iPhone 15 Pro', desc: 'Latest Apple Smartphone', price: 999.99, stock: 50, cat: 'Electronics', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80' },
    { name: 'MacBook Air M3', desc: 'Supercharged Laptop', price: 1199.99, stock: 30, cat: 'Electronics', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80' },
    { name: 'Sony WH-1000XM5', desc: 'Noise Cancelling Headphones', price: 349.99, stock: 45, cat: 'Electronics', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80' },
    { name: 'Samsung Galaxy S24 Ultra', desc: 'Android Flagship', price: 1299.99, stock: 25, cat: 'Electronics', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80' },
    { name: 'iPad Pro 12.9', desc: 'Powerful Tablet', price: 1099.99, stock: 40, cat: 'Electronics', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80' },

    // Fashion
    { name: 'Premium Leather Jacket', desc: 'Genuine Leather', price: 199.99, stock: 20, cat: 'Fashion', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80' },
    { name: 'Classic White Sneakers', desc: 'Everyday Wear', price: 79.99, stock: 100, cat: 'Fashion', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80' },
    { name: 'Designer Sunglasses', desc: 'UV Protection', price: 149.99, stock: 60, cat: 'Fashion', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80' },
    { name: 'Denim Jeans', desc: 'Slim Fit Denim', price: 59.99, stock: 120, cat: 'Fashion', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80' },
    { name: 'Wool Winter Coat', desc: 'Warm and Stylish', price: 129.99, stock: 35, cat: 'Fashion', img: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80' },

    // Books
    { name: 'The Great Gatsby', desc: 'Classic novel', price: 14.99, stock: 200, cat: 'Books', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80' },
    { name: 'Clean Code', desc: 'Software Craftsmanship', price: 45.99, stock: 50, cat: 'Books', img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80' },
    { name: 'Dune', desc: 'Science fiction masterpiece', price: 19.99, stock: 120, cat: 'Books', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80' },
    { name: 'Atomic Habits', desc: 'Build good habits', price: 16.99, stock: 300, cat: 'Books', img: 'https://images.unsplash.com/photo-1589998059171-989d887df466?w=600&q=80' },
    { name: 'Sapiens', desc: 'A Brief History of Humankind', price: 22.99, stock: 150, cat: 'Books', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80' },

    // Home & Kitchen
    { name: 'Ceramic Coffee Mug', desc: 'Handcrafted', price: 12.99, stock: 80, cat: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80' },
    { name: 'Modern Table Lamp', desc: 'Minimalist design', price: 49.99, stock: 40, cat: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80' },
    { name: 'Non-Stick Cookware Set', desc: '12-piece set', price: 129.99, stock: 25, cat: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1584990347449-a162e48e3e50?w=600&q=80' },
    { name: 'Scented Candle', desc: 'Vanilla and Sandalwood', price: 19.99, stock: 100, cat: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80' },
    { name: 'Soft Throw Blanket', desc: 'Cozy and Warm', price: 34.99, stock: 60, cat: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1580828369019-2238b60381e4?w=600&q=80' },

    // Sports & Outdoors
    { name: 'Yoga Mat', desc: 'Non-slip surface', price: 24.99, stock: 100, cat: 'Sports & Outdoors', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80' },
    { name: 'Dumbbell Set', desc: 'Adjustable weights', price: 89.99, stock: 30, cat: 'Sports & Outdoors', img: 'https://images.unsplash.com/photo-1638202366115-38b48f98fb49?w=600&q=80' },
    { name: 'Camping Tent', desc: '4-Person Waterproof', price: 149.99, stock: 15, cat: 'Sports & Outdoors', img: 'https://images.unsplash.com/photo-1504280741562-60234ea08223?w=600&q=80' },
    { name: 'Mountain Bike', desc: '21-Speed Bicycle', price: 499.99, stock: 10, cat: 'Sports & Outdoors', img: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80' },
    { name: 'Basketball', desc: 'Official Size', price: 29.99, stock: 50, cat: 'Sports & Outdoors', img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&q=80' },

    // Beauty & Personal Care
    { name: 'Hydrating Face Serum', desc: 'Hyaluronic Acid', price: 39.99, stock: 80, cat: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80' },
    { name: 'Matte Lipstick', desc: 'Long-lasting color', price: 18.99, stock: 120, cat: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80' },
    { name: 'Men\'s Cologne', desc: 'Woody Fragrance', price: 65.00, stock: 45, cat: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80' },
    { name: 'Electric Toothbrush', desc: 'Deep Cleaning', price: 59.99, stock: 60, cat: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1559591937-ab7e2bd789de?w=600&q=80' },
    { name: 'Hair Dryer', desc: 'Ionic Technology', price: 45.99, stock: 40, cat: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80' },

    // Toys & Games
    { name: 'Lego Star Wars', desc: 'Millennium Falcon', price: 159.99, stock: 20, cat: 'Toys & Games', img: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&q=80' },
    { name: 'Board Game - Catan', desc: 'Strategy Game', price: 44.99, stock: 35, cat: 'Toys & Games', img: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?w=600&q=80' },
    { name: 'Plush Teddy Bear', desc: 'Soft and Cuddly', price: 19.99, stock: 100, cat: 'Toys & Games', img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&q=80' },
    { name: 'Remote Control Car', desc: 'High Speed', price: 39.99, stock: 50, cat: 'Toys & Games', img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80' },
    { name: 'Puzzle 1000 Pieces', desc: 'Landscape View', price: 14.99, stock: 80, cat: 'Toys & Games', img: 'https://images.unsplash.com/photo-1566804554316-24eec38d4e9d?w=600&q=80' },

    // Groceries
    { name: 'Organic Coffee Beans', desc: 'Dark Roast', price: 15.99, stock: 150, cat: 'Groceries', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80' },
    { name: 'Extra Virgin Olive Oil', desc: 'Cold Pressed', price: 22.99, stock: 90, cat: 'Groceries', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80' },
    { name: 'Almond Butter', desc: 'Creamy and Natural', price: 11.99, stock: 120, cat: 'Groceries', img: 'https://images.unsplash.com/photo-1593922858977-ce222dd3bc46?w=600&q=80' },
    { name: 'Green Tea Pack', desc: '100 Tea Bags', price: 9.99, stock: 200, cat: 'Groceries', img: 'https://images.unsplash.com/photo-1627492275564-927a4e69d714?w=600&q=80' },
    { name: 'Oat Milk', desc: 'Plant-based alternative', price: 4.99, stock: 300, cat: 'Groceries', img: 'https://images.unsplash.com/photo-1568181674390-34d6ec5555c2?w=600&q=80' },
  ];

  for (const productData of products) {
    const { cat, img, ...product } = productData;
    const categoryId = dbCategories[cat].id;
    
    const createdProduct = await prisma.product.create({
      data: { ...product, categoryId, vendorId: mainVendor.id },
    });

    await prisma.productImage.create({
      data: {
        productId: createdProduct.id,
        imageUrl: img,
      },
    });
  }

  console.log('Seed data created successfully with extended categories and products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
