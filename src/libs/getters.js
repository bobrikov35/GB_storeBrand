class Getters {
  /**
   * Формирует url-адрес основного изображения товара
   * @param product - объект из каталога
   * @returns {string}
   */
  static getMainImageUrl(product) {
    if (!product) return '#';
    const i = product.url.lastIndexOf('.');
    return `${product.url.slice(0, i)}${product.img.main}${product.url.slice(i)}`;
  }

  /**
   * Формирует url-адрес активного изображения товара
   * @param product - объект из каталога
   * @returns {string}
   */
  static getActiveImageUrl(product) {
    if (!product) return '#';
    const i = product.url.lastIndexOf('.');
    return `${product.url.slice(0, i)}${product.img.current}${product.url.slice(i)}`;
  }
}

export default Getters;
