# Configuración de Stripe para producción

Este documento explica los pasos para cambiar de modo prueba (test) a modo producción (live) para la pasarela de pago.

1) Variables de entorno

- Backend (`server/.env` o en la plataforma de despliegue):
  - `STRIPE_SECRET_KEY` -> Asigna `sk_live_...` (secret key en producción).
  - `STRIPE_WEBHOOK_SECRET` -> El signing secret del webhook (whsec_...)

- Frontend (variables públicas):
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` -> Asigna `pk_live_...` (publishable key en producción).

Importante: nunca subas las claves secretas (`sk_...`) al repositorio.

2) Crear sesión de checkout

La app ya tiene un endpoint protegido en backend: `POST /payments/create-session` que crea una sesión de Stripe usando la clave desde `STRIPE_SECRET_KEY`.

Flujo recomendado en producción:
- El frontend hace `POST /payments/create-session` enviando `plan` y usando el `Authorization: Bearer <token>`.
- El backend crea `checkout.session` con `mode: 'payment'` y `metadata.userId`.
- El backend devuelve `session.url` y el frontend redirige a esa URL.

3) Webhooks

- Registra un webhook en el Dashboard de Stripe apuntando a:
  - `https://your-production-domain/payments/webhook`
- En el Dashboard copia el `Signing secret` y pégalo en `STRIPE_WEBHOOK_SECRET`.
- Para pruebas locales usa `stripe listen --forward-to localhost:3001/payments/webhook` y copia el signing secret.

4) Validaciones y seguridad

- Asegúrate de que `server/src/main.ts` tenga la ruta de webhook registrada con `express.raw(...)` antes de `bodyParser.json()` (la app ya lo hace).
- Verifica que `PaymentsController.handleWebhook` usa `stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)` (la app ya hace esta validación).

5) Recomendaciones adicionales

- Reemplaza montos `unit_amount` por IDs de precio si planeas usar Products/Prices en Stripe Dashboard en lugar de `price_data` dinámico.
- Habilita HTTPS en tu dominio (Vercel/Render la proveen).
- Prueba el flujo en `test` y luego cambia las claves por las live.

6) Checklist rápido para pasar a producción

- [ ] `STRIPE_SECRET_KEY` configurada con `sk_live_...`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configurada con `pk_live_...`
- [ ] `STRIPE_WEBHOOK_SECRET` configurado con `whsec_...`
- [ ] Webhook registrado en Stripe Dashboard apuntando a `/payments/webhook`
- [ ] Probar un pago real con una tarjeta válida (pequeño monto) y verificar que el usuario queda marcado como pro.

Si quieres, puedo:
- Añadir un endpoint para listar sesiones o verificar el estado de una sesión en el backend.
- Cambiar `createCheckoutSession` para usar `price` predefinido (price IDs) en lugar de `price_data` dinámico.
