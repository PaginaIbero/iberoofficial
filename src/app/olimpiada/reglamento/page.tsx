'use client'
import { Section } from "@/components/Section";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col text-black/80">
      <h1 className='text-4xl font-semibold text-center'>Reglamento permanente</h1>
      <br />
      <Section title='Aspectos generales'>
        <p className='my-2'>
          La Olimpiada Iberoamericana de Matemática (OIM), es una competición de matemática dirigida a estudiantes que no hayan superados los 18 años de edad al 31 de diciembre del año inmediato anterior a la celebración de la Olimpiada, se organiza anualmente y participan los países iberoamericanos.
        </p>
        <p className='my-2'>
          La OIM se efectúa en el país seleccionado con el auspicio y apoyo de los organismos (nacionales e internacionales), entidades o personas que deseen colaborar con estos eventos y estén debidamente autorizados por el Comité Organizador de la Olimpiada particular de la que se trate.
        </p>
        <p className='my-2'>
          Es responsabilidad del país sede la designación del Comité Organizador.
        </p>
        <p className='my-2'>
          El Comité Organizador de cada Olimpiada determinará el período durante el cual se realizará el evento en cuestión, tratando de ajustarse a los intereses generales de todos los países participantes y a la tradición.
        </p>
      </Section>
      <Section title='Objetivo de la olimpíada'>
        <p className='my-2'>
          La OIM es una competición de jóvenes estudiantes de países iberoamericanos, cuyos objetivos son:
        </p>
        <ul className='list-disc pl-6 my-2'>
          <li>
            Estimular el estudio de la matemática en los países iberoamericanos.
          </li>
          <li>
            Descubrir y estimular a los jóvenes con talento en los países iberoamericanos.
          </li>
          <li>
            Auspiciar relaciones de amistad entre estudiantes, profesores y maestros de la matemática de los países iberoamericanos.
          </li>
          <li>
            Crear una oportunidad para el intercambio de experiencias educativas entre los profesores de matemática de los países iberoamericanos.
          </li>
        </ul>
      </Section>
      <Section title='Participación'>
        <p className='my-2'>
          El país organizador deberá invitar a los siguientes países iberoamericanos: <strong className="opacity-80">Argentina, Bolivia, Brasil, Chile, Colombia, Costa Rica, Cuba, Ecuador, El Salvador, España, Guatemala, Honduras, México, Nicaragua, Panamá, Paraguay, Perú, Portugal, Puerto Rico, República Dominicana, Uruguay y Venezuela.</strong> Podrá invitar a otros países de lengua española o portuguesa como Angola, Cabo Verde, Mozambique y Santo Tomé y Príncipe.
        </p>
        <p className='my-2'>
          Cada país invitado tiene derecho a estar representado por un equipo de hasta cuatro estudiantes, un profesor Jefe de Delegación y un Tutor de los alumnos.
        </p>
        <p className='my-2'>
          Los estudiantes concursantes deberán satisfacer los siguientes requerimientos:
        </p>
        <ul className='list-disc pl-6 my-2'>
          <li>
            No haber cumplido 18 años de edad al 31 de diciembre del año inmediato anterior a la celebración de la Olimpiada.
          </li>
          <li>
            No haber participado en dos Olimpiadas Iberoamericanas anteriores.
          </li>
        </ul>
        <p className='my-2'>
          El Jefe de Delegación formará parte del Jurado de la Olimpiada y residirá con los miembros de este Jurado, sin poder establecer contacto con los estudiantes concursantes ni con los profesores tutores hasta que hayan finalizado las pruebas de la Olimpiada.
        </p>
        <p className='my-2'>
          El Tutor se regirá por el Artículo anterior a partir del momento en que, por algún motivo justificado, haya debido integrar el Jurado Internacional o establecido contacto con algún miembro del mismo.
        </p>
      </Section>
      <Section title='Financiamiento de la olimpiada'>
        <p className='my-2'>
          Los organizadores cubrirán los gastos normales de estancia, alojamiento, alimentación y, traslados internos de las delegaciones, durante el período de la Olimpiada. Queda entendido que los traslados incluyen la recepción y despedida de las delegaciones desde y hasta el aeropuerto.
        </p>
        <p className='my-2'>
          Los familiares y observadores acreditados podrán acompañar a las delegaciones, pero estarán sujetos a las reglas de financiamiento y organización que determine el Comité Organizador del evento.
        </p>
        <p className='my-2'>
          El pasaje internacional de los participantes es responsabilidad de cada país invitado. No obstante, el Comité Organizador tratará de buscar alternativas que faciliten la financiación de los pasajes.
        </p>
        <p className='my-2'>
          Para colaborar con la organización de la Olimpiada siguiente, el país sede cubrirá los gastos normales de estancia de dos observadores del país que será la sede al año siguiente.
        </p>
        <p className='my-2'>
          Cada país invitado deberá garantizar que su delegación viaja con un seguro que cubra cualquier eventualidad médica o accidente que ocurra a cada uno de sus miembros.
        </p>
      </Section>
      <Section title='De los problemas matemáticos para la competición'>
        <p className='my-2'>
          Cada país invitado podrá proponer hasta seis problemas al Comité Organizador. La fecha límite de entrega de estos problemas será fijada por ese Comité.
        </p>
        <p className='my-2'>
          El Comité Organizador de la Olimpiada tendrá una reserva de 18 problemas.
        </p>
        <p className='my-2'>
          Los problemas versarán sobre los distintos campos de la Matemática de la Educación Preuniversitaria y serán variados en el nivel de dificultad y en los temas que se seleccionen.
        </p>
      </Section>
      <Section title='Las pruebas'>
        <p className='my-2'>
          La competición constará de dos pruebas escritas de cuatro horas y media de duración cada una, que se realizarán en dos días consecutivos. Cada prueba constará de tres problemas.
        </p>
        <p className='my-2'>
          Cada concursante trabajará individualmente. Las respuestas y soluciones se consignarán en papel previsto por el Comité Organizador. Los únicos instrumentos cuyo uso se permitirá serán los necesarios para escribir y dibujar. No está permitido el uso de libros, libretas de notas, tablas y calculadoras.
        </p>
        <p className='my-2'>
          Durante los primeros treinta minutos de cada día, a partir del comienzo de la prueba, los concursantes podrán formular preguntas por escrito al Jurado. Estas preguntas versarán sobre posibles aclaraciones de los enunciados de los problemas.
        </p>
      </Section>
      <Section title='El jurado de la olimpiada iberoamericana'>
        <p className='my-2'>
          El desarrollo de la Olimpiada es responsabilidad del Jurado, que estará integrado por los Jefes de Delegaciones participantes y por un miembro designado por el Comité Organizador, quien lo presidirá. El Jurado Internacional es la máxima autoridad de la Olimpiada durante el desarrollo de la misma y sus decisiones serán inapelables. Entre una Olimpiada y la siguiente la autoridad recaerá sobre el Comité Ejecutivo-Asesor de la Olimpiada y el Comité Organizador de la Olimpiada siguiente.
        </p>
        <p className='my-2'>
          El Comité Organizador designará un Equipo de Coordinación. La función del equipo es la de coayudar a una evaluación justa y uniforme de las pruebas.
        </p>
        <p className='my-2'>
          A las reuniones del Jurado, asistirán como asesores de la presidencia, dos vicepresidentes y un secretario designados por el Comité Organizador, así como los jefes del Equipo de Coordinación.
        </p>
        <p className='my-2'>
          Salvo los casos que hubieren sido acordados previamente por el Comité Organizador, los observadores, coordinadores y cualquier otro personal, deberán contar con la autorización del presidente para asistir a las reuniones del Jurado. Los asistentes autorizados podrán tener voz, pero no derecho a voto.
        </p>
        <p className='my-2'>
          Una vez iniciada la prueba el segundo día, el profesor Tutor se incorporará a las deliberaciones del Jurado.
        </p>
        <p className='my-2'>
          En las reuniones del jurado cada Jefe de Delegación o la persona que eventualmente lo represente en las votaciones tendrá un voto. En caso de empate se emitirá el voto del Presidente del Jurado, que será dirimente.
        </p>
        <p className='my-2'>
          El Jurado podrá formar subcomités con el fin de asesorar sobre aquellas cuestiones específicas para las cuales hayan sido designados.
        </p>
        <p className='my-2'>
          El Jurado deberá:
        </p>
        <ul className='list-disc pl-6 my-2'>
          <li>
            Seleccionar de entre los problemas propuestos, los seis que conformarán las pruebas de la Olimpiada.
          </li>
          <li>
            Decidir sobre la formulación precisa de los enunciados de los problemas en español y en portugués.
          </li>
          <li>
            Decidir sobre posibles respuestas a las preguntas que los participantes formulen durante los primeros treinta minutos de cada prueba.
          </li>
          <li>
            Tomar decisiones en caso de que se presente diferencia de opinión entre el Equipo de Coordinación y el Jefe de alguna Delegación.
          </li>
          <li>
            Decidir sobre la distribución de premios (Medallas, Copa Puerto Rico, Menciones Honoríficas y Premios Especiales).
          </li>
        </ul>
      </Section>
      <Section title='Premios y diplomas'>
        <p className='my-2'>
          Se otorgarán medallas de oro, plata y bronce, además se otorgarán menciones honoríficas a los estudiantes que hayan resuelto un problema perfecto, pero no obtengan la puntuación mínima necesaria para ganar una medalla. Asimismo, se podrá otorgar uno o más premios especiales a aquellas soluciones que los miembros del Equipo de coordinación consideren muy significativas u originales. El Jefe de los Tribunales de Coordinación será la persona encargada de presentar al Jurado Internacional, cualquier propuesta de premio especial. El número total de medallas de oro, plata y bronce será aproximadamente el 50% del total de participantes. La razón entre las cantidades de medallas de oro, plata y bronce que se otorgen será aproximadamente de 1:2:3.
        </p>
        <p className='my-2'>
          Cada participante recibirá un diploma acreditativo de su participación.
        </p>
        <p className='my-2'>
          Las medallas y diplomas serán entregados en un Acto de Clausura.
        </p>
      </Section>
      <Section title='De las próximas olimpiadas'>
        <p className='my-2'>
          En cada Olimpiada el Jurado Internacional seleccionará de entre las peticiones de sede recibidas, la sede de la Olimpiada del tercer año, a partir de esa fecha. En caso de empate de los votos de los Jefes de Delegación, el Presidente del Jurado emitirá un voto dirimente.
        </p>
      </Section>
      <Section title='Comité Ejecutivo-Asesor (CEAOIM)'>
        <p className='my-2'>
          Con el fin de garantizar la continuidad en los criterios de organización de la Olimpiada y atender a las posibles contingencias que pudieran surgir, entre cada Olimpiada existirá un Comité Ejecutivo-Asesor, CEAOIM, compuesto por cinco personas: un representante designado por cada uno de los dos países que han sido la sede en las dos Olimpiadas anteriores, un representante por cada una de las dos próximas Olimpiadas y un representante del Jurado Internacional. Este Comité actuará entre la última reunión del Jurado Internacional de una Olimpiada y la primera reunión del Jurado de la siguiente. El CEAOIM se regirá por un reglamente que se elaborará para tal fin y que deberá ser aprobado por el Jurado Internacional.
        </p>
        <p className='my-2'>
          El representante del Jurado Internacional durará un año en sus funciones será de carácter rotativo, siguiendo el orden alfabético de los países asistentes a la Olimpiada. El primer representante del Jurado Internacional se designará por sorteo y luego continuará el orden lexicográfico. Si el país que le corresponde en un año, ya está representado en el Comité, o no asistió a esa Olimpiada, entonces le toca el turno al siguiente país en el orden establecido y que no esté representado en el Comité.
        </p>
      </Section>
      <Section title='Otros asuntos'>
        <p className='my-2'>
          Cualquier reglamentación contradictoria, situación no recogida en este reglamento, asunto especial o modificación de reglas, será decidida por el Jurado Internacional, con el voto dirimente del Presidente del Jurado.
        </p>
        <p className='my-2'>
          Quedan derogados todos los acuerdos tomados previamente a la sanción de este Reglamento que no figuren en él.
        </p>
      </Section>
    </main>
  )
}

