import { Component, Input } from '@angular/core';
import { TeamMember } from '../team-member/team-member';

@Component({
  selector: 'app-about-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  /**
   * Base path for the background images.
   */
  static baseBackgroundImagePath = '../../../../assets/bg';
  @Input('dark') dark: boolean;

  // ------- -------
  // Team members
  // ------- -------
  team: TeamMember[] = [
    {
      id: 'rodolfo',
      name: 'Dr. Rodolfo Dirzo',
      area: 'Biología',
      description: [
        `Estudió biología en la Universidad Autónoma de Morelos. Después, llevó a cabo su maestría y doctorado en
        la Universidad de Gales, Gran Bretaña, estudiando la ecología evolutiva de la relación entre plantas y
        animales. A su regreso a México se incorporó a la UNAM, donde ha sido investigador en el Instituto de
        Biología e Instituto de Ecología; Director de la Estación Biológica Los Tuxtlas, e Investigador del
        Instituto de Ecología. Su trabajo en Los Tuxtlas contribuyó a la declaración de la Reserva de la Biosfera
        de Los Tuxtlas.`,
        `Desde 2005 es profesor en el Departamento de Biología de la Universidad Stanford. Ademas de su
        investigación, dicta cursos de Conservación Biológica, Ecología, y Diversidad Biocultural. Sus campos de
        trabajo son la ecología y la conservación biológica y las consecuencias de la defaunación sobre los
        ecosistemas y la salud humana.`,
      ],
      imgSrc: 'assets/equipo/RDirzo.jpg',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-13.jpg)`,
          },
          img: {
            filter: 'grayscale(1) brightness(1.3)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1.1) sepia(0.7)',
          },
        },
      },
    },
    {
      id: 'mariana',
      name: 'Dr. Mariana Munguía Carrara',
      area: 'Biología Ambiental',
      description: [
        `Bióloga, estudió en la Universidad Nacional Autónoma de México. Con interés en el área de la conservación
        de la biodiversidad y en conocer las variables determinantes de la distribución geográfica de las
        especies.`,
        `Actualmente participa en la implementación del monitoreo multitaxa para detectar procesos de defaunación,
        los cambios en la diversidad funcional y composición de las comunidades ecológicas. Así como los efectos
        en la salud humana como consecuencia de la pérdida de la biodiversidad por causa de las actividades
        antropogénicas.`,
      ],
      imgSrc: 'assets/equipo/Mariana.jpg',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-7.jpg)`,
          },
          img: {
            filter: 'grayscale(1) brightness(1)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
    {
      id: 'pedro',
      name: 'Biól. Pedro Gabriel Díaz Maeda',
      area: 'Ecología y Sistemas de Información Geográfica',
      description: [
        `Biólogo. Mi interés se centra en el estudio de las comunidades vegetales, su estructura, composición y
        funcionamiento, así como su clasificación, dinámica y distribución en el territorio.`,
        `Dadas las presiones ejercidas por nuestra especie sobre los recursos naturales resulta impostergable el
        establecimiento de sistemas de monitoreo robustos que nos permitan valorar los impactos sobre los
        ecosistemas de una forma geográficamente explícita, así la información generada acerca de la salud e
        integridad de los mismos podrá servir de mejor manera a los tomadores de decisiones, tanto regionales como
        locales, acerca de las acciones a seguir para su conservación y manejo. Asistir en la instrumentación de
        un sistema de monitoreo es una de mis principales actividades.`,
      ],
      imgSrc: 'assets/equipo/Pedro.png',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-21.jpg)`,
          },
          img: {
            filter: 'grayscale(1) brightness(1)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1) sepia(0.7)',
          },
        },
      },
    },
    {
      id: 'everardo',
      name: 'Mtro. Everardo Robredo Esquivelzeta',
      area: 'Biología',
      description: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.`,
      ],
      imgSrc: 'assets/equipo/Everardo.png',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-14.jpg)`,
            'background-position-x': '-210px',
          },
          img: {
            filter: 'grayscale(1) brightness(2)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
    {
      id: 'alex',
      name: 'Dr. Alejandro Ponce Mendoza',
      area: 'Ecología Numérica',
      description: [
        `¡Hola! Soy Alex. Estoy interesado en la ecología numérica y funcional y como visualizar esta información
        para la toma de decisiones. Realicé estudios de Tecnología de Alimentos (UIA) y después de trabajar
        brevemente en ordenamientos ecológicos me enamoré de la ecología. En mis estudios de maestría y doctorado
        estuve en el laboratorio de Ecología de Suelos del Departamento de Biotecnología del CINVESTAV. Después
        realicé post-doctorado en ECOSUR-Villahermosa y la UAM-Xochimilco trabajando tanto en selvas, pastizales,
        acahuales, lagunas y lagos con distintos grupos taxonómicos: insectos, peces, aves. Desde el 2015 me
        integré a CONABIO en proyectos relacionados con Agrobiodiversidad.`,
        `Durante estos años en CONABIO me he enfocado en mostrar la gran cantidad de información a través de
        visualizaciones interactivas. Desde el 2023 me incorporé al proyecto COSMOS. Mis hobbies son andar en
        bici, leer y jugar ajedrez.`,
      ],
      imgSrc: 'assets/equipo/Alex.jpg',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-16.jpg)`,
            'background-size': '100% 100%',
            'background-position-x': '-110px',
          },
          img: {
            filter: 'grayscale(1) brightness(1.5)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
    {
      id: 'miguel',
      name: 'Mtro. Miguel Angel Piña Avelino',
      area: 'Ciencias e Ingeniería de la Computación',
      description: [
        `Candidato a Doctor en Ciencias e Ingeniería de la Computación por la UNAM. Tengo interés en la computación
        teórica y práctica.`,
        `Actualmente colaboro en CONABIO para el procesamiento de datos en el monitoreo de la biodiversidad,
        SIPECAM. Me gusta desarrollar herramientas que permitan resolver distintos tipos de problemas y en el caso
        del monitoreo de la biodiversidad, dar mi granito de arena utilizando mi conocimiento para ayudar en la
        conservación del medio ambiente.`,
      ],
      imgSrc: 'assets/equipo/Miguel.jpg',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-18.jpg)`,
            'background-size': '120% 120%',
            'background-position': '-80px -80px',
          },
          img: {
            filter: 'grayscale(1) brightness(1.2)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
    {
      id: 'francisco',
      name: 'Ing. Francisco Javier Ramírez Paredes',
      area: 'Ciencias e Ingeniería de la Computación',
      description: [
        `Ingeniero de Software. Experimentado en los procesos de construcción y despliegue de sistemas de software,
        con todo lo que ello implica.`,
        `Estoy conciente de que es urgente toda acción enfocada en el cuidado y preservación de nuestro planeta, y
        siento que es grande la deuda que tenemos en ese aspecto. ¿Cuál es tu definición favorita de la
        naturaleza? Me gusta esa definición que la define como una expresión sublime del amor, ciencia y trabajo
        de Quien la creó, pues menciona los aspectos clave para su cuidado y preservación.`,
      ],
      imgSrc: 'assets/equipo/Francisco.jpg',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-20.jpg)`,
            'background-position': '-100px 0px',
          },
          img: {
            filter: 'grayscale(1) brightness(1.5)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
    {
      id: 'santiago',
      name: 'Mtro. Santiago Martínez Balvanera',
      area: 'Matemáticas',
      description: [
        `Matemático. Me interesa estudiar las formas en las que la biodiversidad manifiesta, a través del sonido,
        información acerca de su composición y dinámica. Junto con mi equipo, trabajamos para generar herramientas
        analíticas y computacionales que permitan extraer información ecológica de grabaciones sonoras de campo.
        Buscamos impulsar a la acústica como un instrumento eficiente de monitoreo de la biodiversidad en México.`,
      ],
      imgSrc: 'assets/equipo/Santiago.jpg',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-10.jpg)`,
          },
          img: {
            filter: 'grayscale(1) brightness(5)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(3.5)',
          },
        },
      },
    },
    {
      id: 'oliver',
      name: 'Dr. Oliver López Corona',
      area: 'Física Aplicada a la Ecologia',
      description: [
        `Fisico e investigador de Cátedras CONACyT en CONABIO, trabajo principalmente en un marco teórico
        (termodinámico-informacional) de la Salud Ecosistémica que incluya el estado actual de salud en términos
        de composición, estructura y función (Integridad); la dinámica del sistema (criticalidad); y el tipo de
        respuesta a perturbaciones externas (Antifragilidad). En esa misma línea, busco cómo expandir nuestro
        marco teórico a la otras escalas para medir la salud planetaria y relacionado con ello, cómo reinterpretar
        la crisis planetaria en términos no de un Antropoceno sino Tecnoceno. Página personal:
        www.lopezoliver.otrasenda.org`,
      ],
      imgSrc: 'assets/equipo/Oliver.png',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-15.jpg)`,
            'background-size': '100% 100%',
            'background-position-x': '-110px',
          },
          img: {
            filter: 'grayscale(1) brightness(1.3)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
    {
      id: 'julian',
      name: 'Mtro. Julián Equihua Benítez',
      area: 'Ciencia de Datos',
      description: [
        `Matemático aplicado y geomático. Estoy interesado en la aplicación de la Ciencia de Datos a los problemas
        ecológicos de gran escala. He trabajado principalmente en desarrollar algoritmos de detección de cambios
        con base en imágenes satelitales, en flujos de trabajo para generar cartografía de parámetros
        estructurales de vegetación a nivel nacional para México y en el modelado y estimación de Integridad
        Ecosistémica de los ecosistemas del país.`,
      ],
      imgSrc: 'assets/equipo/Julian.png',
      styles: {
        photo: {
          divHover: {
            'background-image': `url(${TeamComponent.baseBackgroundImagePath}/bg-12.jpg)`,
          },
          img: {
            filter: 'grayscale(1) brightness(1.5)',
          },
          imgHover: {
            filter: 'grayscale(0) brightness(1)',
          },
        },
      },
    },
  ];
  // ------- -------

  getTeamItemId = (index, item) => item.id;
}
