import { Elysia, t } from 'elysia'
import { logger } from '@bogeychan/elysia-logger'
import pino from 'pino'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { jwt } from '@elysiajs/jwt'

const cookieİleBeraber = new Elysia({
  name: 'cookieİleBeraber',
  cookie: {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
    priority: 'high',
    sign: ['session']
  }
}).guard({
  cookie: t.Cookie({
    session: t.Optional(
      t.Object({
        session: t.String()
      })
    )
  })
})

const kimlikVerisiİleBeraber = new Elysia({ name: 'kimlikVerisiİleBeraber' })
  .use(cookieİleBeraber)
  .guard(
      {
        
        beforeHandle: isSignIn
      },
      (app) =>
        app
          .resolve(({ cookie: { session } }) => ({
            userId: findUserById(session.value)
          }))
          .get('/profile', ({ userId }) => userId)
    )
  })

const arkayüz = new Elysia({ name: 'arkayüz' })
  .onStart(() => {
    console.info('Arkayüz çalışmaya başladı.')
  })
  .use(
    logger({
      stream: pino.multistream([
        process.stdout,
        pino.destination('günlük.log')
      ]),
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  )
  .use(
    serverTiming({
      allow: true,
      trace: { total: true }
    })
  )
  .use(swagger({ provider: 'swagger-ui' }))
  .use(staticPlugin({ assets: 'statik', prefix: '/statik' }))
  .use(
    jwt({
      name: 'jwt',
      secret: process.env['JWT_SECRET']!
    })
  )
  .get('/', (ctx) => {
    ctx.log.error(ctx, 'Context')
    ctx.log.info(ctx.request, 'Request')
    return 'pino-pretty'
  })
  .onStop(() => console.info('Arkayüz çalışmayı durdurdu.'))

export default arkayüz
