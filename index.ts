import express, { Application, Request, Response } from "express";

const PORT: number = 5055; // port number terserah, 4 digit

const dbStudent: any[] = [
  {
    id: 1,
    name: "Hajra",
    email: "hajra@mail.com",
  },
  {
    id: 2,
    name: "Arco",
    email: "arco@mail.com",
  },
];

// Define API config
const app: Application = express();

// General Middleware Config untuk parsing JSON body
app.use(express.json()); // Middleware untuk parsing JSON body dari request
// Agar dapat menerima data dari request body, kita perlu menggunakan middleware express.json()

// GET : untuk membaca data dan mengambil data
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Express API</h1>"); // controller untuk mengirim respon, menjadi middleware ketika callback function
});

app.get("/student", (req: Request, res: Response) => {
  // const filters = req.query; // Request input dari user, query string
  // let filteredStudents = dbStudent; // Data semua student

  // // Terapin filternya
  // if (Object.keys(filters).length > 0) {
  //   // Cek apakah ada filter yang diterapkan
  //   filteredStudents = dbStudent.filter(
  //     (
  //       student // Cek setiap student yang cocok dengan filter
  //     ) =>
  //       Object.entries(filters).every(
  //         ([key, value]) =>
  //           student[key] &&
  //           student[key].toString().toLowerCase() ===
  //             value!.toString().toLowerCase()
  //       )
  console.log(req.query);
  res.send(dbStudent);
});

//   res.send(filteredStudents); // Server mengembalikan data student jika tidak ada filter
// });

// POST : Untuk membuat dan menambah data baru
// Note : - Tag url kembar gapapa (/student), tapi request method harus beda
//        - Jika request methodnya sama, maka yang terbaca adalah yang di define duluan (atas)
app.post("/student", (req: Request, res: Response) => {
  console.log("POST", req.body);
  dbStudent.push(req.body); // Menambahkan data baru ke dbStudent
  res.send({
    message: "Data student berhasil ditambahkan",
    result: dbStudent,
  });
});

// PUT / PATCH : untuk memperbarui data. PUT bersifat menimpa data (seluruhnya), sedangkan PATCH bersifat sebagian saja
// :id adalah parameter dinamis, bisa diisi dengan apa saja
app.patch("/student/:id", (req: Request, res: Response) => {
  console.log("PATCH", req.params, req.body); // params: data yang ingin diubah, body: data baru
  const findIdx = dbStudent.findIndex((val: any) => {
    return val.id === parseInt(req.params.id); // Mencari index dari data yang ingin diubah. pake parseInt karena data dapetnya string, sedangkan id adalah number
  });
  dbStudent[findIdx] = { ...dbStudent[findIdx], ...req.body };
  // {id: 3, name: "andre", email: "andre@mail.com", name: "Baila", email: "baila@mail.com"}
  // Mengupdate data yang ada di dbStudent
  // Menggunakan spread operator untuk menggabungkan data lama dengan data baru
  // Pastikan value kanan adalah data yang baru, yang kiri data lama
  res.send({
    message: "Data student berhasil diperbarui",
    result: dbStudent[findIdx],
  });
});

// DELETE : untuk menghapus data
app.delete("/student/:id", (req: Request, res: Response) => {
  console.log("DELETE", req.params);
  const findIdx = dbStudent.findIndex((val: any) => {
    return val.id === parseInt(req.params.id);
  });
dbStudent.splice(findIdx, 1); // Menghapus data yang ada di dbStudent
  // Pake splice untuk menghapus data dari index yang ditemukan, karena data bisa yg mana aja
  res.send({
    message: "Data student berhasil dihapus",
    result: dbStudent,
  });
});

app.listen(PORT, () => {
  console.log(`API is RUNNING on http://localhost:${PORT}`);
});
