/**
 * Central product data store.
 * In production, replace this with API calls or a CMS.
 */

export const PRODUCTS = [
  {
    slug: 'clown-arabic',
    name: 'Clown Arabic',
    type: 'Camiseta Heyssy',
    price: 'R$99,90',
    priceNumber: 99.9,
    imageFront: '/clownarabic/clownarabic.png',
    imageBack: '/clownarabic/clownarabiccosta.png',
    images: ['/clownarabic/clownarabic.png', '/clownarabic/clownarabiccosta.png'],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: { P: true, M: true, G: true, GG: true },
    description:
      'A essência do underground em uma peça marcante. A frontal carrega o logo Heyssy em tipografia gótica agressiva, enquanto as costas revelam a fusão do universo circense sombrio com um lettering inspirado na caligrafia árabe. Confeccionada em 100% algodão penteado premium, possui corte regular e toque macio para o corre diário.',
    unavailable: false,
  },
  {
    slug: 'angel',
    name: 'Angel',
    type: 'Camiseta Heyssy',
    price: 'R$99,90',
    priceNumber: 99.9,
    imageFront: '/angel/angelheyssy.png',
    imageBack: '/angel/angelheyssycosta.png',
    images: ['/angel/angelheyssy.png', '/angel/angelheyssycosta.png'],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: { P: true, M: true, G: true, GG: true },
    description:
      'O equilíbrio perfeito entre o sutil e o agressivo. A frontal apresenta um anjo sombrio e minimalista abaixo da nossa tipografia clássica. Nas costas, uma estampa visceral e imponente domina a peça, redefinindo a estética dark da marca. Produzida em algodão 30.1 penteado com corte oversized leve, garantindo presença e máximo conforto.',
    unavailable: false,
  },
  {
    slug: 'tio-patinhas',
    name: 'Tio Patinhas',
    type: 'Camiseta Heyssy',
    price: 'R$220,90',
    priceNumber: 220.9,
    imageFront: '/patinhas/frentepatinhas.png',
    imageBack: '/patinhas/costapatinhas.png',
    images: ['/patinhas/frentepatinhas.png', '/patinhas/costapatinhas.png'],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: { P: true, M: true, G: true, GG: true },
    description: 'Feita para quem tem visão e ambição. A edição limitada traz o ícone da riqueza com cifrões nos olhos e a tag "Hey$$y" estilizada em amarelo vibrante. Nas costas, a atitude se consolida com a clássica frase "be rich or die trying". Tecido premium de altíssima durabilidade e modelagem exclusiva.',
    unavailable: false,
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}