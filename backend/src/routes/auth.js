import { Router } from 'express'
import { env } from '../config/env.js'
import { supabase, supabaseAdmin } from '../config/supabase.js'
import { createDemoSession, signOutDemoSession } from '../services/demoStore.js'
import { created, fail, ok, requireSupabase } from '../utils/http.js'

const router = Router()

router.post('/signup', async (request, response) => {
  if (!supabase && env.demoAuthEnabled) {
    try {
      const data = createDemoSession(request.body)
      created(response, {
        ...data,
        message: 'Demo signup created. Connect Supabase before production.',
      })
    } catch (error) {
      fail(response, 400, error.message)
    }
    return
  }

  if (!requireSupabase(response, supabase)) return

  const { email, password, name } = request.body

  if (!email || !password) {
    fail(response, 400, 'Email and password are required.')
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    fail(response, 400, error.message)
    return
  }

  created(response, {
    user: data.user,
    session: data.session,
    message: 'Signup created through Supabase Auth.',
  })
})

router.post('/signin', async (request, response) => {
  if (!supabase && env.demoAuthEnabled) {
    try {
      const data = createDemoSession(request.body)
      ok(response, {
        ...data,
        message: 'Demo signin active. Connect Supabase before production.',
      })
    } catch (error) {
      fail(response, 400, error.message)
    }
    return
  }

  if (!requireSupabase(response, supabase)) return

  const { email, password } = request.body

  if (!email || !password) {
    fail(response, 400, 'Email and password are required.')
    return
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    fail(response, 401, error.message)
    return
  }

  ok(response, {
    user: data.user,
    session: data.session,
  })
})

router.post('/signout', async (request, response) => {
  const authorization = request.headers.authorization || ''
  const token = authorization.replace('Bearer ', '').trim()

  if (!token) {
    fail(response, 401, 'Missing bearer token.')
    return
  }

  if (!supabaseAdmin && env.demoAuthEnabled) {
    signOutDemoSession(token)
    ok(response, { message: 'Signed out of demo session.' })
    return
  }

  if (!requireSupabase(response, supabaseAdmin)) return

  const { error } = await supabaseAdmin.auth.admin.signOut(token).catch(() => ({ error: null }))

  if (error) {
    fail(response, 400, error.message)
    return
  }

  ok(response, { message: 'Signed out.' })
})

export default router
