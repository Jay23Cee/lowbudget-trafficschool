type LogLevel = 'info' | 'warn' | 'error'

type LogPrimitive = string | number | boolean | null

export type LogContextValue =
  | LogPrimitive
  | LogContextValue[]
  | {
      [key: string]: LogContextValue | undefined
    }
  | undefined

export type LogContext = Record<string, LogContextValue>

interface LogEntry {
  timestamp: string
  level: LogLevel
  event: string
  message: string
  context?: LogContextValue
  error?: {
    name: string
    message: string
    stack?: string
  }
}

const REDACTED_VALUE = '[redacted]'
const MAX_SANITIZE_DEPTH = 6
const SENSITIVE_KEY_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /jwt/i,
  /email/i,
  /student/i,
  /certificate/i,
]

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key))
}

function sanitizeValue(value: LogContextValue, depth = 0): LogContextValue {
  if (value === undefined || value === null) {
    return value
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  if (depth >= MAX_SANITIZE_DEPTH) {
    return '[max-depth]'
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, depth + 1))
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      isSensitiveKey(key) ? REDACTED_VALUE : sanitizeValue(nestedValue, depth + 1),
    ])
  )
}

function normalizeError(error: unknown): LogEntry['error'] {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  return {
    name: 'UnknownError',
    message: String(error),
  }
}

function writeLog(level: LogLevel, event: string, message: string, context?: LogContext): void {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    message,
  }

  if (context) {
    logEntry.context = sanitizeValue(context)
  }

  const serializedLogEntry = JSON.stringify(logEntry)

  if (level === 'error') {
    console.error(serializedLogEntry)
    return
  }

  if (level === 'warn') {
    console.warn(serializedLogEntry)
    return
  }

  console.info(serializedLogEntry)
}

export const logger = {
  info(event: string, message: string, context?: LogContext): void {
    writeLog('info', event, message, context)
  },
  warn(event: string, message: string, context?: LogContext): void {
    writeLog('warn', event, message, context)
  },
  error(event: string, message: string, error: unknown, context?: LogContext): void {
    const logEntryContext = context ? sanitizeValue(context) : undefined
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      event,
      message,
      error: normalizeError(error),
    }

    if (logEntryContext) {
      logEntry.context = logEntryContext
    }

    console.error(JSON.stringify(logEntry))
  },
}
