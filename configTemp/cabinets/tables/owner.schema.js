const schema = {
  GET: {
    summary: {
      description: 'summary',
      params: {
        type: 'object',
        properties: {
          interval: {
            type: 'string',
            pattern: '^([0-9]+) (\\w+)$'
          },
          'date.from': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          },
          'date.to': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          }
        },
        required: ['date.from', 'date.to']
      },
      headers: {},
      request: {},
      response: {
        type: 'object',
        properties: {
          status: {
            enum: ['OK', 'ERROR']
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  format: 'date-time',
                  totalRow: { text: 'Total:' }
                },
                web: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    index: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    form: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    }
                  },
                  required: ['total', 'index', 'form']
                },
                tor: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits']
                    },
                    index: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits']
                    },
                    form: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits']
                    }
                  },
                  required: ['total', 'index', 'form']
                }
              },
              required: ['date', 'web', 'tor']
            }
          }
        },
        required: ['status', 'data']
      }
    },
    summaryref: {
      description: 'summary by ref',
      params: {
        type: 'object',
        properties: {
          interval: {
            type: 'string',
            pattern: '^([0-9]+) (\\w+)$'
          },
          ref: {
            type: 'string',
            maxLength: 64
          },
          'date.from': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          },
          'date.to': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          }
        },
        required: ['date.from', 'date.to']
      },
      headers: {},
      request: {},
      response: {
        type: 'object',
        properties: {
          status: {
            enum: ['OK', 'ERROR']
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  format: 'date-time',
                  totalRow: { text: 'Total:' }
                },
                ref: {
                  type: ['string', 'null'],
                  maxLength: 64,
                  totalRow: { text: '-' }
                },
                web: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    index: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    form: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    }
                  },
                  required: ['total', 'index', 'form']
                },
                tor: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits']
                    },
                    index: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits']
                    },
                    form: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits']
                    }
                  },
                  required: ['total', 'index', 'form']
                }
              },
              required: ['date', 'ref', 'web', 'tor']
            }
          }
        },
        required: ['status', 'data']
      }
    },
    geo: {
      description: 'geo',
      params: {
        type: 'object',
        properties: {
          'date.from': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          },
          'date.to': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          }
        },
        required: ['date.from', 'date.to']
      },
      headers: {},
      request: {},
      response: {
        type: 'object',
        properties: {
          status: {
            enum: ['OK', 'ERROR']
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                country: {
                  type: ['string', 'null'],
                  minLength: 2,
                  maxLength: 2
                },
                web: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    index: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    form: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    }
                  },
                  required: ['total', 'index', 'form']
                }
              },
              required: ['country', 'web']
            }
          }
        },
        required: ['status', 'data']
      }
    },
    georef: {
      description: 'geo by ref',
      params: {
        type: 'object',
        properties: {
          ref: {
            type: ['string', 'null'],
            maxLength: 64
          },
          'date.from': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          },
          'date.to': {
            type: 'string',
            oneOf: [{ format: 'date-time' }, { format: 'date' }]
          }
        },
        required: ['date.from', 'date.to']
      },
      headers: {},
      request: {},
      response: {
        type: 'object',
        properties: {
          status: {
            enum: ['OK', 'ERROR']
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                country: {
                  type: ['string', 'null'],
                  minLength: 2,
                  maxLength: 2
                },
                ref: {
                  type: ['string', 'null'],
                  maxLength: 64
                },
                web: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    index: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    },
                    form: {
                      type: 'object',
                      properties: {
                        hits: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        },
                        hosts: {
                          type: 'number',
                          minimum: 0,
                          totalRow: { fn: 'sum' }
                        }
                      },
                      required: ['hits', 'hosts']
                    }
                  },
                  required: ['total', 'index', 'form']
                }
              },
              required: ['country', 'ref', 'web']
            }
          }
        },
        required: ['status', 'data']
      }
    },
    bills: {
      description: '',
      params: {},
      headers: {},
      request: {},
      response: {
        type: 'object',
        properties: {
          bill_id: {
            type: 'number',
            totalRow: { text: 'Total:' }
          },
          bill_date: {
            format: 'date-time',
            totalRow: { text: '-' }
          },
          tokens_sold: {
            type: 'number',
            totalRow: { text: '-' }
          },
          coins: {
            type: 'array',
            totalRow: { text: '-' },
            items: {
              type: 'string'
            }
          },
          email: {
            format: 'email',
            totalRow: { text: '-' }
          },
          account_create_date: {
            format: 'date-time',
            totalRow: { text: '-' }
          },
          campaign_name: {
            type: 'array',
            totalRow: { text: '-' },
            items: {
              type: 'string'
            }
          }
        },
        required: [
          'bill_id',
          'bill_date',
          'tokens_sold',
          'coins',
          'email',
          'account_create_date',
          'bonus_names'
        ]
      }
    },
    txList: {
      description: '',
      params: {},
      headers: {},
      request: {},
      response: {
        type: 'object',
        properties: {
          email: {
            format: 'email'
          },
          tx_date: {
            type: 'string'
          },
          address: {
            type: 'string'
          },
          txid: {
            type: 'string'
          },
          coin: {
            type: 'string'
          },
          amount: {
            type: 'string'
          }
        },
        required: ['email', 'tx_date', 'address', 'txid', 'coin', 'amount']
      }
    }
  }
};

module.exports = schema;
