import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@erp-pro.com' },
    update: {},
    create: {
      email: 'admin@erp-pro.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create sample contacts
  const contact1 = await prisma.contact.create({
    data: {
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1 555-0100',
      company: 'Acme Corp',
      status: 'CUSTOMER',
      value: 50000,
      userId: admin.id,
    },
  })

  const contact2 = await prisma.contact.create({
    data: {
      name: 'TechStart Inc',
      email: 'info@techstart.io',
      phone: '+1 555-0200',
      company: 'TechStart',
      status: 'LEAD',
      value: 25000,
      userId: admin.id,
    },
  })
  console.log('Created sample contacts')

  // Create sample project
  const project = await prisma.project.create({
    data: {
      name: 'ERP Implementation',
      description: 'Full ERP system implementation for Acme Corp',
      status: 'ACTIVE',
      progress: 65,
    },
  })
  console.log('Created sample project')

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Setup database schema',
        description: 'Configure PostgreSQL with Prisma',
        status: 'DONE',
        priority: 1,
        projectId: project.id,
        assigneeId: admin.id,
      },
      {
        title: 'Implement authentication',
        description: 'JWT-based auth system',
        status: 'DONE',
        priority: 1,
        projectId: project.id,
        assigneeId: admin.id,
      },
      {
        title: 'Build dashboard UI',
        description: 'React dashboard with charts',
        status: 'IN_PROGRESS',
        priority: 2,
        projectId: project.id,
        assigneeId: admin.id,
      },
      {
        title: 'API integration',
        description: 'Connect frontend to backend APIs',
        status: 'TODO',
        priority: 2,
        projectId: project.id,
        assigneeId: admin.id,
      },
    ],
  })
  console.log('Created sample tasks')

  // Create sample invoice
  const invoice = await prisma.invoice.upsert({
    where: { number: 'INV-2024-001' },
    update: {},
    create: {
      number: 'INV-2024-001',
      contactId: contact1.id,
      userId: admin.id,
      amount: 15000,
      tax: 3000,
      total: 18000,
      status: 'SENT',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: 'Initial implementation phase',
    },
  })
  console.log('Created sample invoice')

  // Create invoice items
  await prisma.invoiceItem.createMany({
    data: [
      {
        invoiceId: invoice.id,
        description: 'Consulting services',
        quantity: 100,
        unitPrice: 150,
        total: 15000,
      },
    ],
  })
  console.log('Created invoice items')

  // Create sample activities
  await prisma.activity.createMany({
    data: [
      {
        userId: admin.id,
        action: 'created',
        entity: 'project',
        entityId: project.id,
        metadata: { name: project.name },
      },
      {
        userId: admin.id,
        action: 'created',
        entity: 'invoice',
        entityId: invoice.id,
        metadata: { number: invoice.number },
      },
    ],
  })
  console.log('Created sample activities')

  // Create sample inventory items
  await prisma.inventoryItem.createMany({
    data: [
      {
        sku: 'LAPTOP-001',
        name: 'MacBook Pro 14"',
        description: 'Apple MacBook Pro 14-inch M3',
        quantity: 50,
        reorderLevel: 10,
        unitPrice: 2499,
        category: 'Electronics',
        location: 'Warehouse A',
      },
      {
        sku: 'MONITOR-001',
        name: 'Dell UltraSharp 27"',
        description: 'Dell UltraSharp U2723QE 4K Monitor',
        quantity: 100,
        reorderLevel: 20,
        unitPrice: 799,
        category: 'Electronics',
        location: 'Warehouse A',
      },
    ],
  })
  console.log('Created inventory items')

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
