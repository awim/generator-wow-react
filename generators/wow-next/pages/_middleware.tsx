// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside

async function _middleware(req: NextRequest) {
    return NextResponse.redirect(new URL('/README', req.url));    
}

export default _middleware;