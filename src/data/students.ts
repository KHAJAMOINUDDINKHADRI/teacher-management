export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourses: string[];
  assignedTeacherId: string;
};

export const students: Student[] = [
  {
    id: "s1",
    name: "Emily Turner",
    email: "emily.turner@example.com",
    phone: "+1 416 555 1111",
    enrolledCourses: ["Vocal Contemporary", "Music Theory"],
    assignedTeacherId: "t1",
  },
  {
    id: "s2",
    name: "Jacob Lee",
    email: "jacob.lee@example.com",
    phone: "+1 416 555 2222",
    enrolledCourses: ["Guitar", "Band Practice"],
    assignedTeacherId: "t2",
  },
  {
    id: "s3",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    phone: "+1 416 555 3333",
    enrolledCourses: ["Violin", "Orchestra"],
    assignedTeacherId: "t3",
  },
];
