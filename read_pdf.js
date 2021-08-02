
// const url = './document/pdf.pdf';

let pdfDoc = null,
 pageNum = 1,
 pageIsRendering = false,
 pageNumIsPending = null;

const scale = 1.8,
  canvas = document.querySelector('#pdf-render'),
  ctx = canvas.getContext('2d');


// Render the Page
const renderPage = number => {
  pageIsRendering = true;

  // get the page
  pdfDoc.getPage(number).then(page => {
    // console.log(page);

    //set scale
    const viewport =page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport
    }
    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if(pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    // sortie page actuelle
    document.querySelector('#page-num').textContent = number;
  });
};

// vérifier le rendu des pages
//Rendu du file d'attente
const queueRenderPage = number => {
  if(pageIsRendering) {
    pageNumIsRendering = number;
  }else{
    renderPage(number);
  }
}

//  afficher la page précédente
const showPrevPage = () => {
  if(pageNum <= 1){
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

//  afficher la page précédente
const showNextPage = () => {
  if(pageNum >= pdfDoc.numPages){
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

// Get document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
// console.log(pdfDoc);
  document.querySelector('#page-count').textContent = pdfDoc.numPages;

  renderPage(pageNum);
});

// Bouton Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);
// :::::::::::::::::::::::::::::::::::::::///:::::::::::::::::::::::::::::::::://
// read pdf with drag and drop
// document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
//   const dropZoneElement = inputElement.closest(".drop-zone");
//
//     dropZoneElement.addEventListener("click", e => {
//       inputElement.click();
//     });
//
//       dropZoneElement.addEventListener("change", e => {
//         if(inputElement.files.length){
//           updateThumbnail(dropZoneElement, inputElement.files[0]);
//         }
//       });
//
//     dropZoneElement.addEventListener("dragover", e => {
//         e.preventDefault();
//       dropZoneElement.classList.add("drop-zone--over");
//     });
//
//     ["dragleave", "dragend"].forEach(type => {
//       dropZoneElement.addEventListener(type, e => {
//         dropZoneElement.classList.remove("drop-zone--over");
//       })
//     });
//
//     dropZoneElement.addEventListener("drop", e => {
//       e.preventDefault();
//       console.log(e.dataTransfer.files);
//
//       if(e.dataTransfer.files.length){
//         inputElement.files = e.dataTransfer.files;
//         updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
//       }
//
//       dropZoneElement.classList.remove("drop-zone--over");
//     });
// });
//
// function updateThumbnail(dropZoneElement, file){
//   console.log(file);
//   let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
//
//   // la premiere fois on a suprime la zone d'ivitation
//     if(dropZoneElement.querySelector(".drop-zone__prompt")){
//     dropZoneElement.querySelector(".drop-zone__prompt").remove();
//     }
//   // Pour la premiere fois on a pas une vignette element, donc on le crée
//   if(!thumbnailElement){
//     thumbnailElement = document.createElement("div");
//     thumbnailElement.classList.add("drop-zone__thumb");
//     dropZoneElement.appendChild(thumbnailElement);
//   }
//    // afficher le nome de fichier
//    thumbnailElement.dataset.label = file.name;
//
//    // afficher le fichier
//    // if(file.type.startsWith("image/") || file.type.startsWith("application/")){
//    // if( file.type.startsWith("image/")){
//
//      const reader = new FileReader();
//
//      reader.readAsDataURL(file);
//
//      reader.onload = () => {
//
//        thumbnailElement.style.backgroundImage = `url('${reader.result}')` ;
//
//        // const url = './document/pdf.pdf';
//        const url = reader.result ;
//
//        let pdfDoc = null,
//         pageNum = 1,
//         pageIsRendering = false,
//         pageNumIsPending = null;
//
//        const scale = 1.8,
//          canvas = document.querySelector('#pdf-render'),
//          ctx = canvas.getContext('2d');
//
//
//        // Render the Page
//        const renderPage = number => {
//          pageIsRendering = true;
//
//          // get the page
//          pdfDoc.getPage(number).then(page => {
//            // console.log(page);
//
//            //set scale
//            const viewport =page.getViewport({ scale });
//            canvas.height = viewport.height;
//            canvas.width = viewport.width;
//
//            const renderCtx = {
//              canvasContext: ctx,
//              viewport
//            }
//            page.render(renderCtx).promise.then(() => {
//              pageIsRendering = false;
//
//              if(pageNumIsPending !== null) {
//                renderPage(pageNumIsPending);
//                pageNumIsPending = null;
//              }
//            });
//
//            // sortie page actuelle
//            document.querySelector('#page-num').textContent = number;
//          });
//        };
//
//        // vérifier le rendu des pages
//        //Rendu du file d'attente
//        const queueRenderPage = number => {
//          if(pageIsRendering) {
//            pageNumIsRendering = number;
//          }else{
//            renderPage(number);
//          }
//        }
//
//        //  afficher la page précédente
//        const showPrevPage = () => {
//          if(pageNum <= 1){
//            return;
//          }
//          pageNum--;
//          queueRenderPage(pageNum);
//        }
//
//        //  afficher la page précédente
//        const showNextPage = () => {
//          if(pageNum >= pdfDoc.numPages){
//            return;
//          }
//          pageNum++;
//          queueRenderPage(pageNum);
//        }
//
//        // Get document
//        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
//          pdfDoc = pdfDoc_;
//        // console.log(pdfDoc);
//          document.querySelector('#page-count').textContent = pdfDoc.numPages;
//
//          renderPage(pageNum);
//        });
//
//        // Bouton Events
//        document.querySelector('#prev-page').addEventListener('click', showPrevPage);
//        document.querySelector('#next-page').addEventListener('click', showNextPage);
//
//      };
//    // }
//    // else{
//    //   thumbnailElement.style.backgroundImage = null;
//    // }
//
//
// }
