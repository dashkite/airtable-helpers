import _configuration from "./_configuration"
environment = process.env.mode ? "development"
console.log "Loading configuration for #{environment}"
configuration = _configuration[ environment ]

export default configuration