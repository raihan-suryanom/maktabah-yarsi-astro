const dummyInvoices = [
  {
    no: 1,
    page: 9,
    relevantQuery: "Hati Dari Sifat Tercela...",
    title: "Adab Murid Terhadap Diri Sendiri",
  },
  {
    no: 12,
    page: 19,
    relevantQuery: "hati, maka tidak dibenarkan menimbanya kecuali dala...",
    title: "Adab Murid Terhadap Diri Sendiri",
  },
  {
    no: 13,
    page: 19,
    relevantQuery: "hati (jantung).”...",
    title: "Adab Murid Terhadap Diri Sendiri",
  },
  {
    no: 14,
    page: 29,
    relevantQuery: "hatinya, menghiasi batinnya, mendekatkan diri kepad...",
    title: "Adab Murid Terhadap Diri Sendiri",
  },
  {
    no: 151,
    page: 139,
    relevantQuery: "sejatinya dia telah menukar sesuatu yang baik dengan ...",
    title: "Adab Murid Terhadap Diri Sendiri",
  },
];

export const getInvoices = async (): Promise<{
  invoices: {
    no: number;
    page: number;
    relevantQuery: string;
    title: string;
  }[];
}> => new Promise((resolve) => resolve({ invoices: dummyInvoices }));
