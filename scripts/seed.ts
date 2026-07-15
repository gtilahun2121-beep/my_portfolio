import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Skills
  await prisma.skill.createMany({
    data: [
      { skillName: 'React', level: 90, category: 'Frontend', order: 1 },
      { skillName: 'Next.js', level: 85, category: 'Frontend', order: 2 },
      { skillName: 'TypeScript', level: 85, category: 'Frontend', order: 3 },
      { skillName: 'Node.js', level: 80, category: 'Backend', order: 4 },
      { skillName: 'PostgreSQL', level: 75, category: 'Database', order: 5 },
      { skillName: 'Prisma', level: 80, category: 'Backend', order: 6 },
      { skillName: 'Tailwind CSS', level: 90, category: 'Frontend', order: 7 },
      { skillName: 'Docker', level: 70, category: 'DevOps', order: 8 },
    ],
  })

  // Seed Sample Project
  await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      shortDesc: 'Full-featured online shopping platform',
      description: 'A comprehensive e-commerce solution with product management, shopping cart, checkout, and payment integration.',
      image: 'https://via.placeholder.com/800x600',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind CSS'],
      category: 'Web Application',
      featured: true,
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      problem: 'Small businesses needed an affordable, easy-to-use e-commerce solution.',
      solution: 'Built a scalable platform with modern tech stack and intuitive admin dashboard.',
      architecture: 'Serverless architecture using Next.js API routes, PostgreSQL database, and Stripe for payments.',
    },
  })

  // Seed Sample Blog
  await prisma.blog.create({
    data: {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-with-nextjs-14',
      content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements...

## New Features

1. **App Router** - Enhanced routing capabilities
2. **Server Components** - Better performance
3. **Improved TypeScript** - Better type safety

## Conclusion

Next.js 14 is a great choice for modern web applications.`,
      excerpt: 'Learn about the new features in Next.js 14 and how to get started.',
      category: 'Web Development',
      tags: ['Next.js', 'React', 'JavaScript'],
      published: true,
      readTime: 5,
    },
  })

  // Seed Sample Experience
  await prisma.experience.create({
    data: {
      company: 'Tech Company Inc.',
      position: 'Senior Full Stack Developer',
      description: 'Led development of multiple web applications using React and Node.js.',
      startDate: new Date('2022-01-01'),
      current: true,
      location: 'Remote',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    },
  })

  // Seed Sample Education
  await prisma.education.create({
    data: {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: new Date('2018-09-01'),
      endDate: new Date('2022-06-01'),
      description: 'Focused on software engineering and web technologies.',
      grade: '3.8 GPA',
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
