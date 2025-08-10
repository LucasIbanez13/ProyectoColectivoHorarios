export function filtrarPorZonaDestino(horarios, zona, destino) {
  return horarios.filter(h => h.zona == zona && h.destino == destino);
}

export function filtrarPorHora(horarios, horaReferencia) {
  const [refH, refM] = horaReferencia.split(':').map(Number);
  const refDate = new Date();
  refDate.setHours(refH, refM, 0, 0);
  const antes = new Date(refDate.getTime() - 30 * 60000);
  const despues = new Date(refDate.getTime() + 2 * 60 * 60000);

  return horarios.filter(h => {
    const [hH, hM] = h.hora.split(':').map(Number);
    const hDate = new Date();
    hDate.setHours(hH, hM, 0, 0);
    return hDate >= antes && hDate <= despues;
  });
}
