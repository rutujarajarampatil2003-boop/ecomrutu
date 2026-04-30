const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  // Clear existing
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  const mainVendor = await prisma.vendor.create({
    data: { vendorName: 'Global Mega Store', email: 'sales@megastore.com' }
  });

  const categoriesData = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661', keyword: 'gadget' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', keyword: 'apparel' },
    { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f', keyword: 'furniture' },
    { name: 'Beauty & Care', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', keyword: 'cosmetics' },
    { name: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794', keyword: 'reading' },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', keyword: 'athlete' },
    { name: 'Toys', image: 'https://images.unsplash.com/photo-1539627831859-a911cf042f8d', keyword: 'lego' },
    { name: 'Automotive', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7', keyword: 'supercar' },
    { name: 'Grocery', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', keyword: 'fruit' },
    { name: 'Health', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843', keyword: 'vitamin' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({
      data: {
        categoryName: cat.name,
        imageUrl: cat.image + "?w=800&q=80",
        description: `Premium selection of ${cat.name} products.`
      }
    });

    for (let i = 1; i <= 8; i++) {
      const price = Math.floor(Math.random() * 800) + 20;
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const rating = 3.5 + Math.random() * 1.5;

      const product = await prisma.product.create({
        data: {
          name: `${cat.name} Item #${i}`,
          description: `This is a high-quality ${cat.name.toLowerCase()} product. Perfect for your lifestyle needs with premium features and durable materials.`,
          price: price,
          stock: Math.floor(Math.random() * 100),
          size: size,
          rating: rating,
          categoryId: createdCat.id,
          vendorId: mainVendor.id,
          images: {
            create: [
              { imageUrl: `https://loremflickr.com/600/600/${cat.keyword}?lock=${i}` },
              { imageUrl: `https://loremflickr.com/600/600/${cat.keyword}?lock=${i+100}` }
            ]
          }
        }
      });
    }
  }
  console.log('Successfully seeded 80 products across 10 categories with full details!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
