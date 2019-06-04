# Trabalho CG

## Integrantes:
* Bruno Veiga - 743514
* Lucas Andrade Costa - 743563
* Gustavo Padilha - 727297

Para esse trabalho foi usda a biblioteca Three.js: https://threejs.org/

Caso haja problemas para visualizar em seu navegador: https://blog.teamtreehouse.com/the-beginners-guide-to-three-js

Recomendamos a utilização do navegador Mozilla Firefox :https://www.mozilla.org/pt-BR/firefox/new/

### Funcionalidades:
* Visualização de dois arquivos locais de objetos, sendo eles portalturret e IronMan.
* Camêra interativa, na qual pode ser controlada pelo clique e arrastar do mouse, pelas teclas direcionais do teclado, e pela tecla espaço.
* Movimentação de um objeto, portalturret, utilizando as teclas AWSD.

### Requisitos:
* **Visualização de dois objetos:** Dois objetos são carregados, a portalturret e IronMan.
* **Interação do usuário na movimentação do objeto:** Movimentação do objeto portalturret, utilizando as teclas AWSD do teclado.
* **Matriz de Transformação do modelo:** Uma Matriz de Transformação para cada objeto em cena, sendo a matriz portalMatrix(linha 114) referente ao objeto portalturret, e a matriz ironmanMatrix(linha 151) referente ao objeto IronMan.
* **Matriz de Visualização:** Uma Matriz de Visualização para a cena toda, matrixScene(linha 93).
* **Duas posições distintas de câmera:** Utilizando a tecla Espaço, há uma troca de posição da câmera.
