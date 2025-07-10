import express, { Application, Request, Response } from "express";
import fs from "fs"; // Library untuk mengelola file & directory
import studentRoute from "./routers/student.router"; // Import route student

const PORT: number = 5055; // port number terserah, 4 digit

// Define API config
const app: Application = express();

// General Middleware Config untuk parsing JSON body
app.use(express.json()); // Middleware untuk parsing JSON body dari request
// Agar dapat menerima data dari request body, kita perlu menggunakan middleware express.json()

// GET : untuk membaca data dan mengambil data
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Express API</h1>"); // controller untuk mengirim respon, menjadi middleware ketika callback function
});

// Config Route
app.use("/student", studentRoute); // Menggunakan route student yang sudah dibuat

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

//   res.send(filteredStudents); // Server mengembalikan data student jika tidak ada filter
// });

// // POST : Untuk membuat dan menambah data baru
// // Note : - Tag url kembar gapapa (/student), tapi request method harus beda
// //        - Jika request methodnya sama, maka yang terbaca adalah yang di define duluan (atas)
app.post("/student", (req: Request, res: Response) => {
  // 1. Mengakses data dari file db.json
  const data = JSON.parse(fs.readFileSync("./db.json").toString()); // Membaca file db.json
  // 2. Generate id data baru
  const newId = data[data.length - 1].id + 1; // Mengambil id terakhir dari data yang ada, lalu ditambah 1 untuk id baru
  // 3. Tambahkan data baru ke array dbStudent
  data.push({ id: newId, ...req.body }); // Menggunakan spread operator untuk menambahkan data baru ke array dbStudent
  // 4. Tulis kembali data ke file db.json
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 4)); // Menulis data baru ke file db.json, dengan format JSON yang rapi (4 spasi)
  // 5. Kirim response ke client
  res.send({
    message: "Data student berhasil ditambahkan",
    result: data,
  });
});

// // PUT / PATCH : untuk memperbarui data. PUT bersifat menimpa data (seluruhnya), sedangkan PATCH bersifat sebagian saja
// // :id adalah parameter dinamis, bisa diisi dengan apa saja
// app.patch("/student/:id", (req: Request, res: Response) => {
//   console.log("PATCH", req.params, req.body); // params: data yang ingin diubah, body: data baru
//   const findIdx = dbStudent.findIndex((val: any) => {
//     return val.id === parseInt(req.params.id); // Mencari index dari data yang ingin diubah. pake parseInt karena data dapetnya string, sedangkan id adalah number
//   });
//   dbStudent[findIdx] = { ...dbStudent[findIdx], ...req.body };
//   // {id: 3, name: "andre", email: "andre@mail.com", name: "Baila", email: "baila@mail.com"}
//   // Mengupdate data yang ada di dbStudent
//   // Menggunakan spread operator untuk menggabungkan data lama dengan data baru
//   // Pastikan value kanan adalah data yang baru, yang kiri data lama
//   res.send({
//     message: "Data student berhasil diperbarui",
//     result: dbStudent[findIdx],
//   });
// });

// // DELETE : untuk menghapus data
// app.delete("/student/:id", (req: Request, res: Response) => {
//   console.log("DELETE", req.params);
//   const findIdx = dbStudent.findIndex((val: any) => {
//     return val.id === parseInt(req.params.id);
//   });
// dbStudent.splice(findIdx, 1); // Menghapus data yang ada di dbStudent
//   // Pake splice untuk menghapus data dari index yang ditemukan, karena data bisa yg mana aja
//   res.send({
//     message: "Data student berhasil dihapus",
//     result: dbStudent,
//   });
// });

app.listen(PORT, () => {
  console.log(`API is RUNNING on http://localhost:${PORT}`);
});
