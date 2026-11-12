# Diplomatura en Profesional Full-Stack Developer

## Curso de desarrollo con Node JS - Profesor: Gabriel Alberini

### Módulo 1: Node JS

### Trabajo Final Integrador

### Desarrollo en Node JS

### Objetivos:

Construir una API RESTful CON Node.js, Express y MongoDB que sirva como backend para una aplicación de chat (o similar), integrando la lógica del servidor con persistencia de datos en base de datos.

### Consideraciones del frontend de la aplicación:

No se pretende desarrollar una aplicación completa, sino establecer algunas funcionalidades que se aprendieron durante el curso y a los fines de cumplir con las consignas de la tarea.<br>

- Se implementa el funcionamiento del carrito de tal forma que en la base de datos se mantenga la persistencia del carrito del usuario activo. Por lo tanto, el usuario debe loguearse para poder ver el carrito.<br>
- Se crea un componente skeleton que permite mostrar un loading (indicador de carga) mientras se cargan los cards de los productos en la página de inicio y además en la página de carrito. Para ello, se reutiliza el componente skeleton diferenciando su funcionalidad por medio del atributo variant.<br>
- El frontend de la aplicación se despliega en Firebase Hosting.<br>
- No se adjuntan imágenes de pantallas, ya que la aplicación se puede ver funcionando desde el link indicado más adelante.<br>
- Se recibe el **token** de autenticación en el **header** de la solicitud para verificar si el usuario está autenticado.<br>
- El **token** se almacena en una **señal** de Angular para poder ser utilizado en cualquier parte de la aplicación.Una alternativa es almacenarlo en el **localStorage**.<br>
- En caso de utilizar el localStorage, la información se puede recuperar si se recarga la página.<br>
- Se utiliza un **interceptor** de Angular para agregar el token de autenticación en el header de la solicitud.<br>
- Se establece un valor de **expiración** para obligar a renovar el token de autenticación. Se establece un lapso de tiempo corto como para mostrar todos los mensajes que llegan desde el backend.<br>
- El mensaje para mantener la sesión abierta tiene un tiempo limitado de duración. Si no se presiona el botón, se cerrará la sesión y se redirigirá al login.<br>
- La arquitectura diseñada para la aplicación permite que todos los errores lleguen al frontend a través de un **interceptor** y se gestionen adecuadamente.Esto evita además que la aplicación se rompa por errores de comunicación con el backend.<br>
- Por medio de un **dialog** y su reutilización se intentan mostrar todos los mensajes que llegan desde el backend.<br>
- En una aplicación real, no es necesario que todos los mensajes tengan que llegar al usuario. Algunos errores deben ser gestionados internamente por la aplicación.<br>
- Las rutas protegidas por el token son las del carrito y se recibiran mensajes de error al intentar entrar en dichas rutas.<br>

### Pasos para la ejecución local:

1. Clonar el repositorio:

```bash
git clone https://github.com/Diplomatura-Full-Stack-Developer/Node-TFI-Frontend
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el script de la aplicación:

```bash
ng serve
```

Tener en cuenta que el backend tiene que estar en ejecución para que la aplicación funcione correctamente.

### Pasos para el despliegue:

1. Iniciar sesión en Firebase:

```bash
firebase login
```

2. Configurar el proyecto de Firebase:

```bash
firebase init
```

3. Ejecutar el script de despliegue:

```bash
ng build
```

4. Ejecutar el script de despliegue:

```bash
firebase deploy
```

### Ejecutar aplicación en producción:

[https://node-tfi.web.app](https://node-tfi.web.app)

### Recursos utilizados:

- Node JS - Versión 24.20.0 ([https://nodejs.org/es/download/](https://nodejs.org/es/download/))
- Npm - Versión 12.0.2 (instalado por defecto con Node JS)
- Express - Versión 5.3.0 ([https://www.npmjs.com/package/express](https://www.npmjs.com/package/express))
- Mongoose - Versión 9.11.3 ([https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose))
- MongoDB Compass - Versión 1.40.4 ([https://www.mongodb.com/es/products/compass](https://www.mongodb.com/es/products/compass))
- Firebase Hosting ([https://firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting))
- PrimeNG - Versión 22.1.4 ([https://v17.primeng.org/](https://v17.primeng.org/))

### Alumno: Rubén Seco

### Comisión: 181806
