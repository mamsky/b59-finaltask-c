const alertChangess = () => {
  event.preventDefault();
  const form = event.target.form;
  Swal.fire({
    title: `Apakah Kamu Yakin?`,
    text: "Apakah Kamu Ingin Mengubah Data?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Change it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        form.submit();
      } catch (error) {
        console.log(error);
      } finally {
        form.submit();
      }
    }
  });
};
