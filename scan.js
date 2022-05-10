const html5QrCode = new Html5Qrcode(/* element id */ "reader");
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  document.getElementById("btn").innerHTML = '<img src = "clipboard-check-fill.svg" width = "20" height = "20">';
}



// File based scanning
const fileinput = document.getElementById('qr-input-file');
fileinput.addEventListener('change', e => {
  if (e.target.files.length == 0) {
    // No file selected, ignore 
    return;
  }

  // Use the first item in the list
  const imageFile = e.target.files[0];
  html5QrCode.scanFile(imageFile, /* showImage= */false)
  .then(qrCodeMessage => {
    // success, use qrCodeMessage
    document.getElementById('jsml').innerHTML = qrCodeMessage
    Swal.fire(
      'Scan success',
      '<span class="mesbox">'+ qrCodeMessage+ '</span>' + '<button onclick'+ ' = "copyToClipboard' + "('#jsml'" + ')" class = "BTN" id = "btn"><img src = "clipboard.svg" width = "20" height = "20"></button>',
      'success'
    )
   // alert(qrCodeMessage)
  })
  .catch(err => {
    Swal.fire({
      title: 'Scan Failed!',
      icon: 'error',
      html: 'QR-Code not found',
  }
    )
    // failure, handle it.
    console.error(`Error scanning file. Reason: ${err}`)
  });
});
html5QrCode.clear();