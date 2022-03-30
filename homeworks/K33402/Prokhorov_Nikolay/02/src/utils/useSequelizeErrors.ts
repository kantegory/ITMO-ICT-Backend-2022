export function useSequelizeErrors(err: any) {
  if (err.name === 'SequelizeValidationError') {
    const errObj: { [key: string]: any } = {};
    err.errors.map((er: any) => {
      errObj[er.path] = er.message;
    })
    return errObj
  } else {
    return { 'error': 'Неизвестная ошибка!' }
  }
}
