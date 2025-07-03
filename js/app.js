const ISBN = document.getElementById('isbn')
const RESULTADO = document.getElementById('resultado')

function verificarISBN() {
  const isbn = ISBN.value.replace(/\s|-/g, '') // Elimina espacios y guiones

  // Validar que sean solo dígitos (excepto si el último carácter puede ser 'X' en ISBN-10)
  if (!/^\d{9}$|^\d{10}$|^\d{12}$|^\d{13}$/.test(isbn)) {
    RESULTADO.innerHTML = '❌ El ISBN debe tener 9, 10, 12 o 13 dígitos.'
    return
  }

  //ISBN-10 (9 dígitos)
  if (isbn.length === 9) {
    let suma = 0
    for (let i = 0; i < 9; i++) {
      suma += (i + 1) * parseInt(isbn[i])
    }
    const resto = suma % 11
    const digitoVerificador = resto === 10 ? 'X' : resto
    const isbnCompleto = isbn + digitoVerificador

    RESULTADO.innerHTML = ` ➕ El dígito de control es: <strong>${digitoVerificador}</strong><br>
      ✅ El ISBN completo y válido: <strong>${isbnCompleto}</strong>`
    return
  }

  //ISBN-10 completo
  if (isbn.length === 10) {
    let suma = 0
    for (let i = 0; i < 9; i++) {
      suma += (i + 1) * parseInt(isbn[i])
    }
    const resto = suma % 11
    const digitoVerificador = resto === 10 ? 'X' : resto.toString()

    if (digitoVerificador === isbn[9].toUpperCase()) {
      RESULTADO.innerHTML = `✅ ISBN-10 válido.`
    } else {
      RESULTADO.innerHTML = `❌ ISBN-10 no válido.<br>
        ➕ El dígito de control correcto sería: <strong>${digitoVerificador}</strong><br>
        ✅ ISBN válido esperado: <strong>${isbn.slice(
          0,
          9
        )}${digitoVerificador}</strong>`
    }
    return
  }

  //ISBN-13 incompleto (12 dígitos)
  if (isbn.length === 12) {
    let suma = 0
    for (let i = 0; i < 12; i++) {
      const factor = i % 2 === 0 ? 1 : 3
      suma += factor * parseInt(isbn[i])
    }
    const resto = suma % 10
    const digitoVerificador = resto === 0 ? 0 : 10 - resto
    const isbnCompleto = isbn + digitoVerificador

    RESULTADO.innerHTML = ` ➕ El dígito de control calculado es: <strong>${digitoVerificador}</strong><br>
      ✅ El ISBN completo y válido sería: <strong>${isbnCompleto}</strong>`
    return
  }

  //ISBN-13 completo
  if (isbn.length === 13) {
    let suma = 0
    for (let i = 0; i < 12; i++) {
      const factor = i % 2 === 0 ? 1 : 3
      suma += factor * parseInt(isbn[i])
    }
    const resto = suma % 10
    const digitoVerificador = resto === 0 ? 0 : 10 - resto

    if (digitoVerificador === parseInt(isbn[12])) {
      RESULTADO.innerHTML = `✅ ISBN-13 válido.`
    } else {
      RESULTADO.innerHTML = `❌ ISBN-13 no válido.<br>
        ➕ El dígito de control correcto sería: <strong>${digitoVerificador}</strong><br>
        ✅ ISBN válido esperado: <strong>${isbn.slice(
          0,
          12
        )}${digitoVerificador}</strong>`
    }
    return
  }
}
