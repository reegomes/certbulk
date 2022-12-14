var express = require('express');
var router = express.Router();
var PDFDocument = require('pdfkit');
var fs = require("fs");

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});


const names = [
    { fileName: "File 1"},
    { fileName: "File 2"},
    { fileName: "File 3"},
    { fileName: "File 4"},
]

const mocks = [
    {
        "user_name": "ALEXANDRE TORQUETI TOLOI",
        "description": "Treinamento sobre Assédio e Discriminação",
        "url": "/certificates/CertificatePrint.html?customerId=tothbe?certificateId=891&bg=https://s3test.engage.bz/tothbe/certificados/background_20220623105450912.png&title=&text=<p><p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">A TothBe - Treinamentos e Soluções Corporativas confere ao(a) aluno(a) <b>ALEXANDRE TORQUETI TOLOI</b> o presente certificado de conclusão do treinamento sobre Assédio moral, sexual e outros temas Discriminatórios nas Relações de Trabalho, com foco na conscientização, com carga horária de 30 (trinta) minutos, na data de <b>24 de agosto de 2022</b></span></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">O presente certificado tem a validade de 12 meses, a contar de sua emissão.</span></p></p>&verseUrl=https://s3.engage.bz/tothbe/certificados/verseBackgroundUrl_20220707141956057.jpg&verseText=<p></p>",
        "customCssUrl": "https://s3test.engage.bz/tothbe/custom/custom-one.css?r=1666991156830",
        "certificateId": 891,
        "backgroundUrl": "https://s3test.engage.bz/tothbe/certificados/background_20220623105450912.png",
        "title": "",
        "certificateText": "<p><p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">A TothBe - Treinamentos e Soluções Corporativas confere ao(a) aluno(a) <b>ALEXANDRE TORQUETI TOLOI</b> o presente certificado de conclusão do treinamento sobre Assédio moral, sexual e outros temas Discriminatórios nas Relações de Trabalho, com foco na conscientização, com carga horária de 30 (trinta) minutos, na data de <b>24 de agosto de 2022</b></span></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">O presente certificado tem a validade de 12 meses, a contar de sua emissão.</span></p></p>",
        "verse_background_url": "https://s3.engage.bz/tothbe/certificados/verseBackgroundUrl_20220707141956057.jpg",
        "certificateContent": null
    },
    {
        "user_name": "ALFREDO ALTHEN SCHIAVO",
        "description": "Treinamento sobre Assédio e Discriminação",
        "url": "/certificates/CertificatePrint.html?customerId=tothbe?certificateId=891&bg=https://s3test.engage.bz/tothbe/certificados/background_20220623105450912.png&title=&text=<p><p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">A TothBe - Treinamentos e Soluções Corporativas confere ao(a) aluno(a) <b>ALFREDO ALTHEN SCHIAVO</b> o presente certificado de conclusão do treinamento sobre Assédio moral, sexual e outros temas Discriminatórios nas Relações de Trabalho, com foco na conscientização, com carga horária de 30 (trinta) minutos, na data de <b>22 de agosto de 2022</b></span></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">O presente certificado tem a validade de 12 meses, a contar de sua emissão.</span></p></p>&verseUrl=https://s3.engage.bz/tothbe/certificados/verseBackgroundUrl_20220707141956057.jpg&verseText=<p></p>",
        "customCssUrl": "https://s3test.engage.bz/tothbe/custom/custom-one.css?r=1666991157222",
        "certificateId": 891,
        "backgroundUrl": "https://s3test.engage.bz/tothbe/certificados/background_20220623105450912.png",
        "title": "",
        "certificateText": "<p><p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">A TothBe - Treinamentos e Soluções Corporativas confere ao(a) aluno(a) <b>ALFREDO ALTHEN SCHIAVO</b> o presente certificado de conclusão do treinamento sobre Assédio moral, sexual e outros temas Discriminatórios nas Relações de Trabalho, com foco na conscientização, com carga horária de 30 (trinta) minutos, na data de <b>22 de agosto de 2022</b></span></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">O presente certificado tem a validade de 12 meses, a contar de sua emissão.</span></p></p>",
        "verse_background_url": "https://s3.engage.bz/tothbe/certificados/verseBackgroundUrl_20220707141956057.jpg",
        "certificateContent": null
    },
    {
        "user_name": "ALISSON ARRAIS COSTA",
        "description": "Treinamento sobre Assédio e Discriminação",
        "url": "/certificates/CertificatePrint.html?customerId=tothbe?certificateId=891&bg=https://s3test.engage.bz/tothbe/certificados/background_20220623105450912.png&title=&text=<p><p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">A TothBe - Treinamentos e Soluções Corporativas confere ao(a) aluno(a) <b>ALISSON ARRAIS COSTA</b> o presente certificado de conclusão do treinamento sobre Assédio moral, sexual e outros temas Discriminatórios nas Relações de Trabalho, com foco na conscientização, com carga horária de 30 (trinta) minutos, na data de <b>26 de agosto de 2022</b></span></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">O presente certificado tem a validade de 12 meses, a contar de sua emissão.</span></p></p>&verseUrl=https://s3.engage.bz/tothbe/certificados/verseBackgroundUrl_20220707141956057.jpg&verseText=<p></p>",
        "customCssUrl": "https://s3test.engage.bz/tothbe/custom/custom-one.css?r=1666991157629",
        "certificateId": 891,
        "backgroundUrl": "https://s3test.engage.bz/tothbe/certificados/background_20220623105450912.png",
        "title": "",
        "certificateText": "<p><p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">A TothBe - Treinamentos e Soluções Corporativas confere ao(a) aluno(a) <b>ALISSON ARRAIS COSTA</b> o presente certificado de conclusão do treinamento sobre Assédio moral, sexual e outros temas Discriminatórios nas Relações de Trabalho, com foco na conscientização, com carga horária de 30 (trinta) minutos, na data de <b>26 de agosto de 2022</b></span></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">O presente certificado tem a validade de 12 meses, a contar de sua emissão.</span></p></p>",
        "verse_background_url": "https://s3.engage.bz/tothbe/certificados/verseBackgroundUrl_20220707141956057.jpg",
        "certificateContent": null
    },
]

router.post('/', function(req, res, next) {
    try {
        mocks.map(mock => {
            const doc = new PDFDocument({
                layout: "landscape",
                size: "A4"
            });
        
            // const fileName = "TesteNomeArquivo";
            // const content = "Criando o certificado";
        
            // Quero colocar uma chave única para cada arquivo.
            const timeStamp = Date.now();
        
            // inline é o paramêtro que faz com que o pdf não baixe direto, mas sim abra no navegador, estou utilizando para o desenvolvimento.
            // No lugar de inline, se for para baixar direto, é attachment
            // res.setHeader("Content-disposition", 'inline; filename="' + fileName + ".pdf" + '"');
            // res.setHeader("Content-type", "application/pdf");
        
            const pdfStream = fs.createWriteStream(`public/certificateId/${mock.user_name}.pdf`)
        
            doc.image("public/images/background_20220623105450912.png", 10, 10, { width: 825 });
            // doc.image(`${mock.backgroundUrl}`, 10, 10, { width: 825 });
            
            doc.fontSize(40).text(mock.user_name, { align: "center"}, 315);
        
        
            doc.pipe(pdfStream);
            doc.end();
        })
    } catch (error) {
        console.error("Error: ", error.message)
    } finally {
        res.redirect("/")
    }
});

module.exports = router;
