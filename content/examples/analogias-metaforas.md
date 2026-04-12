---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 14 años, 3º ESO, adulto...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 1º Bachillerato...

    - key: CONCEPTO
      label: Concepto que quieres entender
      hint: El concepto abstracto o difícil que quieres conectar con algo conocido
      type: text
      placeholder: Ej. la mitosis, la derivada, el imperialismo...

    - key: ASIGNATURA
      label: Asignatura
      type: text
      placeholder: Ej. Biología, Matemáticas, Historia...

    - key: DEPORTES/VIDEOJUEGOS/COCINA/MÚSICA/REDES_SOCIALES/OTRO
      label: Mis intereses y aficiones
      hint: La IA usará esto para crear analogías que conecten con tu mundo
      type: select
      options:
        - value: DEPORTES
          label: Deportes
        - value: VIDEOJUEGOS
          label: Videojuegos
        - value: COCINA
          label: Cocina
        - value: MÚSICA
          label: Música
        - value: REDES_SOCIALES
          label: Redes sociales
        - value: OTRO
          label: Otro (añade tus intereses en el textarea)
---
# Generar analogías o metáforas para entender mejor

## Cuándo usarlo
Cuando un concepto es abstracto o complejo y se necesita conectarlo con algo conocido y cotidiano para comprenderlo de verdad.

## Qué consigues
- Relacionar conceptos difíciles con ideas familiares.
- Construir puentes mentales que faciliten el recuerdo.
- Entender no solo el "qué" sino el "cómo funciona" de forma intuitiva.

## Prompt plantilla
```text
Actúa como un/a comunicador/a experto/a en hacer comprensible lo complejo.

Tengo [EDAD/NIVEL] y estoy en [CURSO].
Necesito entender mejor el concepto de [CONCEPTO] de [ASIGNATURA].

Mis intereses y lo que conozco bien: [DEPORTES/VIDEOJUEGOS/COCINA/MÚSICA/REDES_SOCIALES/OTRO].

Quiero que:
1) Crees 3 analogías diferentes que comparen [CONCEPTO] con algo de mi vida cotidiana o mis intereses.
2) Para cada analogía:
   - Describe la comparación de forma clara.
   - Explica qué partes del concepto real representa cada elemento de la analogía.
   - Señala dónde la analogía deja de funcionar (sus límites).
3) Crea una metáfora visual que pueda dibujar o imaginar fácilmente.
4) Compara [CONCEPTO] con otro concepto que ya conozca de la misma asignatura u otra, indicando en qué se parecen y en qué se diferencian.
5) Ordena las analogías de la más accesible a la más exigente o precisa.
6) Añade una pregunta de comprobación y una mini aplicación para usar la mejor analogía en un caso concreto.

Reglas:
- Las analogías deben ser precisas, no solo divertidas.
- Prioriza comparaciones con cosas que un/a estudiante de mi edad conoce bien.
- Si el concepto tiene partes, haz analogías para el todo y para las partes.
```

## Ajustes rápidos
- Para memorizar: `convierte la mejor analogía en una frase corta que pueda usar como regla mnemotécnica`.
- Para ampliar: `compara [CONCEPTO] con [OTRO_CONCEPTO] que me cuesta diferenciar`.
- Si no conecta contigo: `mis intereses son [NUEVOS_INTERESES], genera analogías basadas en ellos`.
