export type Qualification = {
  name: string;
  rate: string;
};

export type Teacher = {
  id: string;
  name: string;
  role: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  qualifications: Qualification[];
  groupQualifications: Qualification[];
};

export const teachers: Teacher[] = [
  {
    id: "t1",
    name: "Alynia Allan",
    role: "Teacher",
    birthDate: "1985-06-15",
    email: "alyniaallan@example.com",
    phone: "+1 416 849 4057",
    address: "56 Oswaldio Da Santos Cir, North York, Ontario, Canada",
    qualifications: [
      { name: "Vocal Contemporary", rate: "$28.00" },
      { name: "Vocal Core", rate: "$28.00" },
      { name: "Vocal Plus", rate: "$28.00" },
      { name: "Instrument", rate: "$28.00" },
    ],
    groupQualifications: [{ name: "Piano Practice", rate: "$30.00" }],
  },
  {
    id: "t2",
    name: "Brian Smith",
    role: "Senior Teacher",
    birthDate: "1978-03-22",
    email: "brian.smith@example.com",
    phone: "+1 647 555 1234",
    address: "12 Maple Ave, Toronto, Ontario, Canada",
    qualifications: [
      { name: "Guitar", rate: "$35.00" },
      { name: "Piano", rate: "$32.00" },
    ],
    groupQualifications: [{ name: "Band Practice", rate: "$25.00" }],
  },
  {
    id: "t3",
    name: "Cynthia Lee",
    role: "Teacher",
    birthDate: "1990-11-05",
    email: "cynthia.lee@example.com",
    phone: "+1 416 555 7890",
    address: "88 King St W, Toronto, Ontario, Canada",
    qualifications: [
      { name: "Violin", rate: "$30.00" },
      { name: "Music Theory", rate: "$28.00" },
    ],
    groupQualifications: [{ name: "Orchestra", rate: "$22.00" }],
  },
];
