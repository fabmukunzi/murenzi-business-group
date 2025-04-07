import { PrismaClient, RoleData } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
    const roles: RoleData[] = [RoleData.ADMIN];

    for (const role of roles) {
        const existingRole = await prisma.role.findUnique({
            where: { name: role },
        });

        if (!existingRole) {
            await prisma.role.create({
                data: { name: role },
            });
            console.log(`Role '${role}' created.`);
        } else {
            console.log(`Role '${role}' already exists.`);
        }
    }
}

async function seedMenuCategories() {
    const categories = [
        { name: 'Food', description: 'Delicious food items' },
        { name: 'Drinks', description: 'Refreshing beverages' },
        { name: 'Main Course', description: 'Hearty main meals' },
    ];

    for (const category of categories) {
        const existingCategory = await prisma.menuCategory.findUnique({
            where: { name: category.name },
        });

        if (!existingCategory) {
            await prisma.menuCategory.create({
                data: category,
            });
            console.log(`Category '${category.name}' created.`);
        } else {
            console.log(`Category '${category.name}' already exists.`);
        }
    }
}

async function main() {
    await seedRoles();
    await seedMenuCategories();
    console.log('Seeding completed.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Error seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
