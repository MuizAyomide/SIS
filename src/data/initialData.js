// Initial data structure for the SIS
export const initialData = {
  users: [
    {
      id: 1,
      email: "admin@sis.com",
      password: "admin123",
      role: "admin",
      name: "System Administrator",
      avatar: "",
      lastLogin: null
    },
    {
      id: 2,
      email: "lecturer1@university.edu",
      password: "lecturer123",
      role: "lecturer",
      name: "Dr. Jane Smith",
      avatar: "",
      department: "Computer Science",
      lastLogin: null
    },
     {
      id: 3,
      email: "Akinrinolamuiz22@gmail.com",
      password: "122334",
      role: "admin",
      name: "System Administrator",
      avatar: "",
      lastLogin: null
    },
    {
      id: 4,
      email: "student1@university.edu",
      password: "student123",
      role: "student",
      name: "John Doe",
      avatar: "",
      studentId: "S001",
      program: "Computer Science",
      semester: 6,
      courses: [1, 3],
      results: [
        { courseId: 1, score: 85, grade: "A" },
        { courseId: 3, score: 78, grade: "B+" }
      ],
      lastLogin: null
    }
  ],
  courses: [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      credits: 3,
      instructor: "Dr. Jane Smith",
      description: "Fundamentals of programming concepts and structures",
      schedule: "Mon, Wed 10:00-11:30",
      enrolledStudents: [3]
    },
    {
      id: 2,
      code: "MATH101",
      name: "Calculus I",
      credits: 4,
      instructor: "Dr. Robert Johnson",
      description: "Differential and integral calculus",
      schedule: "Tue, Thu 9:00-10:30",
      enrolledStudents: []
    },
    {
      id: 3,
      code: "CS201",
      name: "Data Structures",
      credits: 3,
      instructor: "Dr. Alan Turing",
      description: "Study of data structures and algorithms",
      schedule: "Mon, Wed, Fri 14:00-15:00",
      enrolledStudents: [3]
    }
  ],
  announcements: [
    {
      id: 1,
      title: "Welcome to the New Academic Year",
      content: "The new academic year begins on September 1st. All students must complete registration by August 25th.",
      date: "2023-08-15",
      author: "System Administrator"
    },
    {
      id: 2,
      title: "Examination Schedule Published",
      content: "The examination schedule for the current semester has been published. Please check your dashboard.",
      date: "2023-11-10",
      author: "Examination Department"
    }
  ]
};

// Helper function to generate a unique ID
export const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};