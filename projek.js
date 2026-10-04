let gradeData = [
    {
        id: 1,
        name: "Obi wan",
        subject:"Matematika",
        score: 88,
        category: "A"
    },
    {   id:2,
        name: "Sakamoto",
        subject: "Bahasa Inggris",
        score: 78,
        category: "B"
    }
];

//ELEMENT
const gradeForm = document.getElementById("grade-form");
const nameInput = document.getElementById("student-name");
const subjectInput = document.getElementById("subject-name");
const scoreInput = document.getElementById("score-input");
const searchInput = document.getElementById("search-input");
const tableBody = document.getElementById("grade-table-body");
const emptyState = document.getElementById("empty-state");
const statTotal = document.getElementById("stat-total");
const statAverage = document.getElementById("stat-avg");
const statMax = document.getElementById("stat-max");
const statMin = document.getElementById("stat-min");

//agar bisa ganti tampilan

function pindahPage(pageName){
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("input").classList.add("hidden");
    document.getElementById("daftar").classList.add("hidden");

    document.getElementById(pageName).classList.remove("hidden");
    window.scrollTo(0, 0);
}

//Menentukan kategori nilai

function tentukanNilai(score) {
    if (score >= 85){
        return"A";
    }
    else if (score >= 75){
        return "B";
    }
    else if (score >= 65){
        return "C";
    }
    else if (score >= 50){
        return "D";
    }
    else {
        return "E";
    }
}

function tentukanCategori(category){
    if (category == "A"){
        return "badge-a"
    }
    else if (category === "B") {
        return "badge-b";
    }
    else if (category === "C") {
        return "badge-c";
    }
    else if (category === "D") {
        return "badge-d";
    }
    else {
        return "badge-e";
    }
}

// STATISTIKA

function updateStatistics() {
    let totalSiswa = gradeData.length;
    if (totalSiswa === 0) {

        statTotal.textContent = 0;
        statAverage.textContent = "0.0";
        statMax.textContent = 0;
        statMin.textContent = 0;

        return;
    }

    let totalNilai = 0;

    for (let i = 0; i < gradeData.length; i++) {

        totalNilai = totalNilai + gradeData[i].score;
    }

    let rataRata = totalNilai / totalSiswa;
    let nilaiTertinggi = gradeData[0].score;
    let nilaiTerendah = gradeData[0].score;

    for (let i = 1; i < gradeData.length; i++) {
        if (gradeData[i].score > nilaiTertinggi) {

            nilaiTertinggi = gradeData[i].score;
        }
        if (gradeData[i].score < nilaiTerendah) {

            nilaiTerendah = gradeData[i].score;
        }
    }
    statTotal.textContent = totalSiswa;
    statAverage.textContent = rataRata.toFixed(1);
    statMax.textContent = nilaiTertinggi;
    statMin.textContent = nilaiTerendah;
}


// MENAMPILKAN TABEL

function renderTable(data) {
    tableBody.innerHTML = "";
    if (data.length === 0) {
        emptyState.classList.remove("hidden");
    }
    else {
        emptyState.classList.add("hidden");
    }
    for (let i = 0; i < data.length; i++) {
        let siswa = data[i];
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>

            <td>
                <strong>${siswa.name}</strong>
            </td>

            <td>${siswa.subject}</td>

            <td>${siswa.score}</td>

            <td>
                <span class="badge ${tentukanCategori(siswa.category)}">
                    ${siswa.category}
                </span>
            </td>

            <td>
                <button
                    class="btn-delete"
                    onclick="deleteGrade(${siswa.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                    Hapus
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    updateStatistics();
}


// TAMBAH NILAI

gradeForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let nama = nameInput.value.trim();
    let mataPelajaran = subjectInput.value;
    let nilai = Number(scoreInput.value);
    if (
        nama === "" ||
        mataPelajaran === "" ||
        scoreInput.value === ""
    ) {
        alert("Harap isi semua data!");
        return;
    }

    if (nilai < 0 || nilai > 100) {
        alert("Nilai harus antara 0 sampai 100!");
        return;
    }
    let dataBaru = {
        id: Date.now(),
        name: nama,
        subject: mataPelajaran,
        score: nilai,
        category: tentukanNilai(nilai)
    };
    gradeData.push(dataBaru);
    Swal.fire({
        title: "Berhasil",
        text: "Data siswa berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK"
    });
    gradeForm.reset();
    renderTable(gradeData);
    // setelah menambah langsung ke daftar nilai
    pindahPage("daftar");

});


// HAPUS DATA

function deleteGrade(id) {

    let yakin = confirm(
        "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (yakin) {
        gradeData = gradeData.filter(function(siswa) {

            return siswa.id !== id;

        });
        renderTable(gradeData);
    }
}

// PENCARIAN

searchInput.addEventListener("input", function() {
    let keyword = searchInput.value.toLowerCase();
    let hasilPencarian = [];
    for (let i = 0; i < gradeData.length; i++) {

        let siswa = gradeData[i];
        if (
            siswa.name.toLowerCase().includes(keyword) ||
            siswa.subject.toLowerCase().includes(keyword)
        ) {

            hasilPencarian.push(siswa);
        }
    }
    renderTable(hasilPencarian);
});


// SAAT WEBSITE DIBUKA
renderTable(gradeData);
pindahPage("dashboard");