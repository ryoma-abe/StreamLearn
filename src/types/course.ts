export type Course = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
  instructor: {
    id: string;
    name: string;
  };
};
