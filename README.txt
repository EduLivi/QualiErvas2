# Qualiervas Site Pronto

## Estrutura
- index.html
- styles.css
- script.js
- images/

## Como trocar pelas fotos reais
Basta substituir os arquivos dentro da pasta `images` mantendo os mesmos nomes:

- produto-ervas.svg
- produto-chas.svg
- produto-suplementos.svg
- produto-graos.svg
- produto-temperos.svg
- produto-entrega.svg
- loja-fachada.svg
- loja-interior.svg
- loja-produtos.svg
- loja-atendimento.svg

Você pode trocar por `.jpg`, `.png` ou `.webp`, mas nesse caso também precisa atualizar as extensões no `index.html`.

## Google Maps
O site funciona sem a chave da API, mostrando o botão de fallback.
Se quiser o mapa interativo, troque `SUA_CHAVE_GOOGLE_MAPS_API` no `index.html`.
