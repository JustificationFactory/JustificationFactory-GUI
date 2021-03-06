import {Actor, Conclusion, Evidence, LinkElement, Rationale, Step, Strategy, Support, Util} from './diagram';

import * as joint from 'jointjs';

describe('diagram.', function () {

  beforeEach(() => {

  });

  describe('Util.', function () {

    it('getNewGuid', function () {
      const guid = Util.getNewGuid();

      expect(guid).not.toBeUndefined();
      expect(guid.trim().length).toEqual(36);
    });

  });

  describe('DiagramElements.', function () {

    it('Evidence / Strategy / LinkElement', function () {
      const e = new Evidence('Evidence1', {test: '1'}, 'type1');

      expect(e.getId()).not.toBeUndefined();
      expect(e.getId().trim().length).toEqual(36);
      expect(e.name).toEqual('Evidence1');
      expect(e.jsonElement.test).toEqual('1');
      expect(e.visualShape instanceof joint.shapes.basic.Path).toEqual(true);

      const s = new Strategy({
        name: 'Strategy1',
        test: '2',
        type: 'type2'
      });

      expect(s.getId()).not.toBeUndefined();
      expect(s.getId().trim().length).toEqual(36);
      expect(s.name).toEqual('Strategy1');
      expect(s.jsonElement.test).toEqual('2');
      expect(s.visualShape instanceof joint.shapes.basic.Path).toEqual(true);

      const l = new LinkElement(e, s);

      expect(l.sourceElement.getId()).not.toBeUndefined(e.getId());
      expect(l.targetElement.getId()).not.toBeUndefined(s.getId());
    });

    it('Evidence / Conclusion / Support', function () {
      const e = new Evidence('Evidence1', {test: '1'}, 'type1');

      const c = new Conclusion({
        name: 'Strategy1',
        test: '2',
        type: 'type2'
      });

      expect(c.getId()).not.toBeUndefined();
      expect(c.getId().trim().length).toEqual(36);
      expect(c.name).toEqual('Conclusion1');
      expect(c.jsonElement.test).toEqual('2');
      expect(c.visualShape instanceof joint.shapes.basic.Path).toEqual(true);

      const s = new Support(c, e);

      expect(s.getId()).not.toBeUndefined();
      expect(s.getId().trim().length).toEqual(36);
      expect(s.name).toEqual('Conclusion1');
      expect(s.jsonElement.test).toEqual('2');
      expect(s.visualShape instanceof joint.shapes.basic.Path).toEqual(true);
    });

    it('Conclusion / Artifact / Limitation', function () {
      const limitsInside = [{
        'element': {
          'type': 'experimentation',
          'persistent': true,
          'stimulation': {
            'code': 'stimulation',
            'path': 'fr.axonic',
            'persistent': true,
            'stimulationScheduler': {
              'code': 'scheduler',
              'path': 'fr.axonic.stimulation',
              'persistent': true,
              'from': {
                'code': 'from',
                'path': 'fr.axonic.stimulation.scheduler',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
              },
              'to': {
                'code': 'to',
                'path': 'fr.axonic.stimulation.scheduler',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
              }
            },
            'waveform': {
              'code': 'waveform',
              'path': 'fr.axonic.stimulation',
              'persistent': true,
              'value': 'RECTANGULAR',
              'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                'persistent': true,
                'value': 'RAMP'
              }]
            },
            'waveformParameter': {
              'code': 'waveformParameters',
              'path': 'fr.axonic.stimulation',
              'persistent': true,
              'amplitude': {
                'type': 'aContinuousNumber',
                'code': 'amplitude',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': {'type': 'double', 'value': 1000.1}
              },
              'duration': {
                'type': 'aContinuousNumber',
                'code': 'duration',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': {'type': 'int', 'value': 300}
              },
              'frequency': {
                'type': 'aContinuousNumber',
                'code': 'frequency',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': {'type': 'double', 'value': 500}
              }
            }
          },
          'subject': {
            'code': 'subject',
            'path': 'fr.axonic',
            'persistent': true,
            'dynamicInformations': {
              'code': 'dynamic',
              'path': 'fr.axonic.subject',
              'persistent': true,
              'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
              'weight': {
                'code': 'weight',
                'path': 'fr.axonic.subject.dynamic',
                'persistent': true,
                'value': {'type': 'double', 'value': 130}
              }
            },
            'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
            'pathologyInformations': {
              'code': 'pathology',
              'path': 'fr.axonic.subject',
              'persistent': true,
              'beginningOfObesity': {
                'code': 'beginningObesity',
                'path': 'fr.axonic.subject.pathology',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
              },
              'obesityType': {
                'type': 'aRangedEnum',
                'code': 'obesityType',
                'path': 'fr.axonic.subject.pathology',
                'persistent': true,
                'value': 'GYNOID',
                'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                  'persistent': true,
                  'value': 'MIXED'
                }]
              }
            },
            'staticInformations': {
              'code': 'static',
              'path': 'fr.axonic.subject',
              'persistent': true,
              'birthday': {
                'code': 'birthday',
                'path': 'fr.axonic.subject.static',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
              },
              'gender': {
                'type': 'aRangedEnum',
                'code': 'gender',
                'path': 'fr.axonic.subject.static',
                'persistent': true,
                'value': 'MALE',
                'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                  'persistent': true,
                  'value': 'UNKNOWN'
                }]
              },
              'height': {
                'code': 'height',
                'path': 'fr.axonic.subject.static',
                'persistent': true,
                'value': {'type': 'double', 'value': 70.5}
              },
              'name': {'code': 'name', 'path': 'fr.axonic.subject.static', 'persistent': true, 'value': {'type': 'string', 'value': 'Paul'}}
            }
          }
        },
        'name': 'Experimentation',
        'limits': {
          'subject': [{
            'code': 'subject',
            'path': 'fr.axonic',
            'persistent': true,
            'dynamicInformations': {
              'code': 'dynamic',
              'path': 'fr.axonic.subject',
              'persistent': true,
              'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
              'weight': {
                'code': 'weight',
                'path': 'fr.axonic.subject.dynamic',
                'persistent': true,
                'value': {'type': 'double', 'value': 130}
              }
            },
            'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
            'pathologyInformations': {
              'code': 'pathology',
              'path': 'fr.axonic.subject',
              'persistent': true,
              'beginningOfObesity': {
                'code': 'beginningObesity',
                'path': 'fr.axonic.subject.pathology',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
              },
              'obesityType': {
                'type': 'aRangedEnum',
                'code': 'obesityType',
                'path': 'fr.axonic.subject.pathology',
                'persistent': true,
                'value': 'GYNOID',
                'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                  'persistent': true,
                  'value': 'MIXED'
                }]
              }
            },
            'staticInformations': {
              'code': 'static',
              'path': 'fr.axonic.subject',
              'persistent': true,
              'birthday': {
                'code': 'birthday',
                'path': 'fr.axonic.subject.static',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
              },
              'gender': {
                'type': 'aRangedEnum',
                'code': 'gender',
                'path': 'fr.axonic.subject.static',
                'persistent': true,
                'value': 'MALE',
                'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                  'persistent': true,
                  'value': 'UNKNOWN'
                }]
              },
              'height': {
                'code': 'height',
                'path': 'fr.axonic.subject.static',
                'persistent': true,
                'value': {'type': 'double', 'value': 70.5}
              },
              'name': {'code': 'name', 'path': 'fr.axonic.subject.static', 'persistent': true, 'value': {'type': 'string', 'value': 'Paul'}}
            }
          }],
          'stimulation': [{
            'code': 'stimulation',
            'path': 'fr.axonic',
            'persistent': true,
            'stimulationScheduler': {
              'code': 'scheduler',
              'path': 'fr.axonic.stimulation',
              'persistent': true,
              'from': {
                'code': 'from',
                'path': 'fr.axonic.stimulation.scheduler',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
              },
              'to': {
                'code': 'to',
                'path': 'fr.axonic.stimulation.scheduler',
                'persistent': true,
                'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
              }
            },
            'waveform': {
              'code': 'waveform',
              'path': 'fr.axonic.stimulation',
              'persistent': true,
              'value': 'RECTANGULAR',
              'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                'persistent': true,
                'value': 'RAMP'
              }]
            },
            'waveformParameter': {
              'code': 'waveformParameters',
              'path': 'fr.axonic.stimulation',
              'persistent': true,
              'amplitude': {
                'type': 'aContinuousNumber',
                'code': 'amplitude',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': {'type': 'double', 'value': 1000.1}
              },
              'duration': {
                'type': 'aContinuousNumber',
                'code': 'duration',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': {'type': 'int', 'value': 300}
              },
              'frequency': {
                'type': 'aContinuousNumber',
                'code': 'frequency',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': {'type': 'double', 'value': 500}
              }
            }
          }]
        }
      }
      ];

      limitsInside['name'] = 'Conclusion1';
      limitsInside['type'] = 'type2';
      const c = new Conclusion(limitsInside);

      expect(c.artifacts.length).toEqual(2);
      expect(c.artifacts[0].name).toEqual('subject');
      expect(c.artifacts[1].name).toEqual('stimulation');
      expect((c.visualShape as any).portData.ports.length).toEqual(2);
    });

    it('Rationale / Actor', function () {
      const r = new Rationale('Rationale1', {test: '1'}, 'type1');

      expect(r.getId()).not.toBeUndefined();
      expect(r.getId().trim().length).toEqual(36);
      expect(r.name).toEqual('Rationale1');
      expect(r.jsonElement.test).toEqual('1');
      expect(r.visualShape instanceof joint.shapes.basic.Rect).toEqual(true);

      const a = new Actor('Actor1', {test: '2'}, 'type2');

      expect(a.getId()).not.toBeUndefined();
      expect(a.getId().trim().length).toEqual(36);
      expect(a.name).toEqual('Actor1');
      expect(a.jsonElement.test).toEqual('2');
      expect(a.visualShape instanceof joint.shapes.basic.Rect).toEqual(true);
    });

  });

  describe('Save diagram states.', function () {

    it('Deserialize current state', function () {
      const states = {
        'previous': [{
          'changeDate': '2017-02-21T15:54:46.036Z',
          'businessSteps': [{
            'id': 'a1ee5a51-bc00-4c7d-5d53-616c76be216c',
            'elements': [{
              'elementType': 'Conclusion',
              'name': 'Experimentation',
              'description': '',
              'type': 'experimentation',
              'visualShapeId': '25d212c4-71a3-4a1a-04ad-5c3f35c41ff9',
              'jsonElement': [{
                'element': {
                  'type': 'experimentation',
                  'persistent': true,
                  'stimulation': {
                    'code': 'stimulation',
                    'path': 'fr.axonic',
                    'persistent': true,
                    'stimulationScheduler': {
                      'code': 'scheduler',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'from': {
                        'code': 'from',
                        'path': 'fr.axonic.stimulation.scheduler',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                      },
                      'to': {
                        'code': 'to',
                        'path': 'fr.axonic.stimulation.scheduler',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                      }
                    },
                    'waveform': {
                      'code': 'waveform',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': 'RECTANGULAR',
                      'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                        'persistent': true,
                        'value': 'RAMP'
                      }]
                    },
                    'waveformParameter': {
                      'code': 'waveformParameters',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'amplitude': {
                        'type': 'aContinuousNumber',
                        'code': 'amplitude',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 1000.1}
                      },
                      'duration': {
                        'type': 'aContinuousNumber',
                        'code': 'duration',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': {'type': 'int', 'value': 300}
                      },
                      'frequency': {
                        'type': 'aContinuousNumber',
                        'code': 'frequency',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 500}
                      }
                    }
                  },
                  'subject': {
                    'code': 'subject',
                    'path': 'fr.axonic',
                    'persistent': true,
                    'dynamicInformations': {
                      'code': 'dynamic',
                      'path': 'fr.axonic.subject',
                      'persistent': true,
                      'bmi': {
                        'code': 'bmi',
                        'path': 'fr.axonic.subject.dynamic',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 40}
                      },
                      'weight': {
                        'code': 'weight',
                        'path': 'fr.axonic.subject.dynamic',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 130}
                      }
                    },
                    'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                    'pathologyInformations': {
                      'code': 'pathology',
                      'path': 'fr.axonic.subject',
                      'persistent': true,
                      'beginningOfObesity': {
                        'code': 'beginningObesity',
                        'path': 'fr.axonic.subject.pathology',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                      },
                      'obesityType': {
                        'type': 'aRangedEnum',
                        'code': 'obesityType',
                        'path': 'fr.axonic.subject.pathology',
                        'persistent': true,
                        'value': 'GYNOID',
                        'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                          'persistent': true,
                          'value': 'MIXED'
                        }]
                      }
                    },
                    'staticInformations': {
                      'code': 'static',
                      'path': 'fr.axonic.subject',
                      'persistent': true,
                      'birthday': {
                        'code': 'birthday',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                      },
                      'gender': {
                        'type': 'aRangedEnum',
                        'code': 'gender',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': 'MALE',
                        'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                          'persistent': true,
                          'value': 'UNKNOWN'
                        }]
                      },
                      'height': {
                        'code': 'height',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 70.5}
                      },
                      'name': {
                        'code': 'name',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': {'type': 'string', 'value': 'Paul'}
                      }
                    }
                  }
                },
                'name': 'Experimentation',
                'limits': {
                  'subject': [{
                    'code': 'subject',
                    'path': 'fr.axonic',
                    'persistent': true,
                    'dynamicInformations': {
                      'code': 'dynamic',
                      'path': 'fr.axonic.subject',
                      'persistent': true,
                      'bmi': {
                        'code': 'bmi',
                        'path': 'fr.axonic.subject.dynamic',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 40}
                      },
                      'weight': {
                        'code': 'weight',
                        'path': 'fr.axonic.subject.dynamic',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 130}
                      }
                    },
                    'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                    'pathologyInformations': {
                      'code': 'pathology',
                      'path': 'fr.axonic.subject',
                      'persistent': true,
                      'beginningOfObesity': {
                        'code': 'beginningObesity',
                        'path': 'fr.axonic.subject.pathology',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                      },
                      'obesityType': {
                        'type': 'aRangedEnum',
                        'code': 'obesityType',
                        'path': 'fr.axonic.subject.pathology',
                        'persistent': true,
                        'value': 'GYNOID',
                        'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                          'persistent': true,
                          'value': 'MIXED'
                        }]
                      }
                    },
                    'staticInformations': {
                      'code': 'static',
                      'path': 'fr.axonic.subject',
                      'persistent': true,
                      'birthday': {
                        'code': 'birthday',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                      },
                      'gender': {
                        'type': 'aRangedEnum',
                        'code': 'gender',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': 'MALE',
                        'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                          'persistent': true,
                          'value': 'UNKNOWN'
                        }]
                      },
                      'height': {
                        'code': 'height',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 70.5}
                      },
                      'name': {
                        'code': 'name',
                        'path': 'fr.axonic.subject.static',
                        'persistent': true,
                        'value': {'type': 'string', 'value': 'Paul'}
                      }
                    }
                  }],
                  'stimulation': [{
                    'code': 'stimulation',
                    'path': 'fr.axonic',
                    'persistent': true,
                    'stimulationScheduler': {
                      'code': 'scheduler',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'from': {
                        'code': 'from',
                        'path': 'fr.axonic.stimulation.scheduler',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                      },
                      'to': {
                        'code': 'to',
                        'path': 'fr.axonic.stimulation.scheduler',
                        'persistent': true,
                        'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                      }
                    },
                    'waveform': {
                      'code': 'waveform',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': 'RECTANGULAR',
                      'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                        'persistent': true,
                        'value': 'RAMP'
                      }]
                    },
                    'waveformParameter': {
                      'code': 'waveformParameters',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'amplitude': {
                        'type': 'aContinuousNumber',
                        'code': 'amplitude',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 1000.1}
                      },
                      'duration': {
                        'type': 'aContinuousNumber',
                        'code': 'duration',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': {'type': 'int', 'value': 300}
                      },
                      'frequency': {
                        'type': 'aContinuousNumber',
                        'code': 'frequency',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': {'type': 'double', 'value': 500}
                      }
                    }
                  }]
                }
              }],
              'artifacts': [{
                'elementType': 'Limitation',
                'name': 'subject',
                'description': '',
                'type': '',
                'jsonElement': [{
                  'element': {
                    'type': 'experimentation',
                    'persistent': true,
                    'stimulation': {
                      'code': 'stimulation',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'stimulationScheduler': {
                        'code': 'scheduler',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'from': {
                          'code': 'from',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                        },
                        'to': {
                          'code': 'to',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                        }
                      },
                      'waveform': {
                        'code': 'waveform',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': 'RECTANGULAR',
                        'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                          'persistent': true,
                          'value': 'RAMP'
                        }]
                      },
                      'waveformParameter': {
                        'code': 'waveformParameters',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'amplitude': {
                          'type': 'aContinuousNumber',
                          'code': 'amplitude',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 1000.1}
                        },
                        'duration': {
                          'type': 'aContinuousNumber',
                          'code': 'duration',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'int', 'value': 300}
                        },
                        'frequency': {
                          'type': 'aContinuousNumber',
                          'code': 'frequency',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 500}
                        }
                      }
                    },
                    'subject': {
                      'code': 'subject',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'dynamicInformations': {
                        'code': 'dynamic',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'bmi': {
                          'code': 'bmi',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 40}
                        },
                        'weight': {
                          'code': 'weight',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 130}
                        }
                      },
                      'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                      'pathologyInformations': {
                        'code': 'pathology',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'beginningOfObesity': {
                          'code': 'beginningObesity',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                        },
                        'obesityType': {
                          'type': 'aRangedEnum',
                          'code': 'obesityType',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': 'GYNOID',
                          'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                            'persistent': true,
                            'value': 'MIXED'
                          }]
                        }
                      },
                      'staticInformations': {
                        'code': 'static',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'birthday': {
                          'code': 'birthday',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                        },
                        'gender': {
                          'type': 'aRangedEnum',
                          'code': 'gender',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': 'MALE',
                          'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                            'persistent': true,
                            'value': 'UNKNOWN'
                          }]
                        },
                        'height': {
                          'code': 'height',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 70.5}
                        },
                        'name': {
                          'code': 'name',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'string', 'value': 'Paul'}
                        }
                      }
                    }
                  },
                  'name': 'Experimentation',
                  'limits': {
                    'subject': [{
                      'code': 'subject',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'dynamicInformations': {
                        'code': 'dynamic',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'bmi': {
                          'code': 'bmi',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 40}
                        },
                        'weight': {
                          'code': 'weight',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 130}
                        }
                      },
                      'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                      'pathologyInformations': {
                        'code': 'pathology',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'beginningOfObesity': {
                          'code': 'beginningObesity',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                        },
                        'obesityType': {
                          'type': 'aRangedEnum',
                          'code': 'obesityType',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': 'GYNOID',
                          'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                            'persistent': true,
                            'value': 'MIXED'
                          }]
                        }
                      },
                      'staticInformations': {
                        'code': 'static',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'birthday': {
                          'code': 'birthday',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                        },
                        'gender': {
                          'type': 'aRangedEnum',
                          'code': 'gender',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': 'MALE',
                          'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                            'persistent': true,
                            'value': 'UNKNOWN'
                          }]
                        },
                        'height': {
                          'code': 'height',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 70.5}
                        },
                        'name': {
                          'code': 'name',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'string', 'value': 'Paul'}
                        }
                      }
                    }],
                    'stimulation': [{
                      'code': 'stimulation',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'stimulationScheduler': {
                        'code': 'scheduler',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'from': {
                          'code': 'from',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                        },
                        'to': {
                          'code': 'to',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                        }
                      },
                      'waveform': {
                        'code': 'waveform',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': 'RECTANGULAR',
                        'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                          'persistent': true,
                          'value': 'RAMP'
                        }]
                      },
                      'waveformParameter': {
                        'code': 'waveformParameters',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'amplitude': {
                          'type': 'aContinuousNumber',
                          'code': 'amplitude',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 1000.1}
                        },
                        'duration': {
                          'type': 'aContinuousNumber',
                          'code': 'duration',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'int', 'value': 300}
                        },
                        'frequency': {
                          'type': 'aContinuousNumber',
                          'code': 'frequency',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 500}
                        }
                      }
                    }]
                  }
                }]
              }, {
                'elementType': 'Limitation',
                'name': 'stimulation',
                'description': '',
                'type': '',
                'jsonElement': [{
                  'element': {
                    'type': 'experimentation',
                    'persistent': true,
                    'stimulation': {
                      'code': 'stimulation',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'stimulationScheduler': {
                        'code': 'scheduler',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'from': {
                          'code': 'from',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                        },
                        'to': {
                          'code': 'to',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                        }
                      },
                      'waveform': {
                        'code': 'waveform',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': 'RECTANGULAR',
                        'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                          'persistent': true,
                          'value': 'RAMP'
                        }]
                      },
                      'waveformParameter': {
                        'code': 'waveformParameters',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'amplitude': {
                          'type': 'aContinuousNumber',
                          'code': 'amplitude',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 1000.1}
                        },
                        'duration': {
                          'type': 'aContinuousNumber',
                          'code': 'duration',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'int', 'value': 300}
                        },
                        'frequency': {
                          'type': 'aContinuousNumber',
                          'code': 'frequency',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 500}
                        }
                      }
                    },
                    'subject': {
                      'code': 'subject',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'dynamicInformations': {
                        'code': 'dynamic',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'bmi': {
                          'code': 'bmi',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 40}
                        },
                        'weight': {
                          'code': 'weight',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 130}
                        }
                      },
                      'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                      'pathologyInformations': {
                        'code': 'pathology',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'beginningOfObesity': {
                          'code': 'beginningObesity',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                        },
                        'obesityType': {
                          'type': 'aRangedEnum',
                          'code': 'obesityType',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': 'GYNOID',
                          'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                            'persistent': true,
                            'value': 'MIXED'
                          }]
                        }
                      },
                      'staticInformations': {
                        'code': 'static',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'birthday': {
                          'code': 'birthday',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                        },
                        'gender': {
                          'type': 'aRangedEnum',
                          'code': 'gender',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': 'MALE',
                          'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                            'persistent': true,
                            'value': 'UNKNOWN'
                          }]
                        },
                        'height': {
                          'code': 'height',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 70.5}
                        },
                        'name': {
                          'code': 'name',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'string', 'value': 'Paul'}
                        }
                      }
                    }
                  },
                  'name': 'Experimentation',
                  'limits': {
                    'subject': [{
                      'code': 'subject',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'dynamicInformations': {
                        'code': 'dynamic',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'bmi': {
                          'code': 'bmi',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 40}
                        },
                        'weight': {
                          'code': 'weight',
                          'path': 'fr.axonic.subject.dynamic',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 130}
                        }
                      },
                      'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                      'pathologyInformations': {
                        'code': 'pathology',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'beginningOfObesity': {
                          'code': 'beginningObesity',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                        },
                        'obesityType': {
                          'type': 'aRangedEnum',
                          'code': 'obesityType',
                          'path': 'fr.axonic.subject.pathology',
                          'persistent': true,
                          'value': 'GYNOID',
                          'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                            'persistent': true,
                            'value': 'MIXED'
                          }]
                        }
                      },
                      'staticInformations': {
                        'code': 'static',
                        'path': 'fr.axonic.subject',
                        'persistent': true,
                        'birthday': {
                          'code': 'birthday',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                        },
                        'gender': {
                          'type': 'aRangedEnum',
                          'code': 'gender',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': 'MALE',
                          'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                            'persistent': true,
                            'value': 'UNKNOWN'
                          }]
                        },
                        'height': {
                          'code': 'height',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 70.5}
                        },
                        'name': {
                          'code': 'name',
                          'path': 'fr.axonic.subject.static',
                          'persistent': true,
                          'value': {'type': 'string', 'value': 'Paul'}
                        }
                      }
                    }],
                    'stimulation': [{
                      'code': 'stimulation',
                      'path': 'fr.axonic',
                      'persistent': true,
                      'stimulationScheduler': {
                        'code': 'scheduler',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'from': {
                          'code': 'from',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                        },
                        'to': {
                          'code': 'to',
                          'path': 'fr.axonic.stimulation.scheduler',
                          'persistent': true,
                          'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                        }
                      },
                      'waveform': {
                        'code': 'waveform',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'value': 'RECTANGULAR',
                        'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                          'persistent': true,
                          'value': 'RAMP'
                        }]
                      },
                      'waveformParameter': {
                        'code': 'waveformParameters',
                        'path': 'fr.axonic.stimulation',
                        'persistent': true,
                        'amplitude': {
                          'type': 'aContinuousNumber',
                          'code': 'amplitude',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 1000.1}
                        },
                        'duration': {
                          'type': 'aContinuousNumber',
                          'code': 'duration',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'int', 'value': 300}
                        },
                        'frequency': {
                          'type': 'aContinuousNumber',
                          'code': 'frequency',
                          'path': 'fr.axonic.stimulation',
                          'persistent': true,
                          'value': {'type': 'double', 'value': 500}
                        }
                      }
                    }]
                  }
                }]
              }]
            }, {
              'elementType': 'Strategy',
              'name': 'Treat',
              'description': '',
              'type': 'humanStrategy',
              'visualShapeId': '0399cfea-60ea-47f1-f031-a991b72a8ff6',
              'jsonElement': [{
                'type': 'humanStrategy',
                'name': 'Treat',
                'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
                'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
                'minimumRole': 'TECHNICIAN'
              }],
              'artifacts': [{
                'elementType': 'Rationale',
                'name': 'OBESITY & AXIS',
                'description': '',
                'type': '',
                'visualShapeId': 'fbcc3229-dd86-4f90-44d1-a57bc0168ba7',
                'jsonElement': [{
                  'type': 'humanStrategy',
                  'name': 'Treat',
                  'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
                  'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
                  'minimumRole': 'TECHNICIAN'
                }]
              }, {
                'elementType': 'Actor',
                'name': 'Chloé',
                'description': '',
                'type': 'INTERMEDIATE_EXPERT',
                'visualShapeId': '959ebfba-510d-4d81-fbd7-296dd90968fa',
                'jsonElement': [{
                  'type': 'humanStrategy',
                  'name': 'Treat',
                  'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
                  'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
                  'minimumRole': 'TECHNICIAN'
                }]
              }]
            }, {
              'elementType': 'Evidence',
              'name': 'Stimulation 0',
              'description': '',
              'type': 'stimulation',
              'visualShapeId': '7ac47aa7-b4e9-4d08-0f9a-3259bf249f92',
              'jsonElement': [{
                'element': {
                  'type': 'stimulation',
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                }, 'name': 'Stimulation 0'
              }],
              'artifacts': []
            }, {
              'elementType': 'Evidence',
              'name': 'Subject 0',
              'description': '',
              'type': 'subject',
              'visualShapeId': 'fe83c7fb-b4d9-4797-53b0-314ea64b1ca2',
              'jsonElement': [{
                'element': {
                  'type': 'subject',
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }, 'name': 'Subject 0'
              }],
              'artifacts': []
            }]
          }],
          'graph': {
            'cells': [{
              'type': 'basic.Path',
              'size': {'width': 143, 'height': 44},
              'position': {'x': 277.75, 'y': 10},
              'angle': 0,
              'id': '25d212c4-71a3-4a1a-04ad-5c3f35c41ff9',
              'ports': {
                'items': [{
                  'id': 'e83c18dc-c30c-4d4d-9005-e070690f05aa',
                  'label': {'position': {'name': 'manual', 'args': {'x': -11.5, 'y': 20}}},
                  'markup': 'rect',
                  'attrs': {
                    'rect': {
                      'fill': '#DF0606',
                      'rx': 5,
                      'ry': 10,
                      'x': -31.5,
                      'y': 3,
                      'width': 85,
                      'height': 25,
                      'stroke': '#000000'
                    }, 'text': {'text': 'subject', 'fill': '#FFFFFF'}
                  }
                }, {
                  'id': '17c4dcfa-5d95-41dc-f8e4-5f199d65901e',
                  'label': {'position': {'name': 'manual', 'args': {'x': 109.5, 'y': 9}}},
                  'markup': 'rect',
                  'attrs': {
                    'rect': {
                      'fill': '#DF0606',
                      'rx': 5,
                      'ry': 10,
                      'x': 89.5,
                      'y': -8,
                      'width': 108,
                      'height': 25,
                      'stroke': '#000000'
                    }, 'text': {'text': 'stimulation', 'fill': '#FFFFFF'}
                  }
                }]
              },
              'attrs': {
                'path': {'fill': '#CCCC00', 'd': 'M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z'},
                'text': {'text': 'Experimentation', 'ref-y': 0.3, 'y': 5}
              }
            }, {
              'type': 'basic.Path',
              'size': {'width': 73, 'height': 32},
              'position': {'x': 312.75, 'y': 104},
              'angle': 0,
              'id': '0399cfea-60ea-47f1-f031-a991b72a8ff6',
              'embeds': ['fbcc3229-dd86-4f90-44d1-a57bc0168ba7', '959ebfba-510d-4d81-fbd7-296dd90968fa'],
              'attrs': {
                'path': {'fill': '#008000', 'd': 'M 10 0 L 70 0 L 60 30 L 0 30 Z'},
                'text': {'text': 'Treat', 'fill': '#FFFFFF', 'ref-y': 0.3}
              }
            }, {
              'type': 'basic.Rect',
              'position': {'x': 435.75, 'y': 104},
              'size': {'width': 148, 'height': 32},
              'angle': 0,
              'id': 'fbcc3229-dd86-4f90-44d1-a57bc0168ba7',
              'parent': '0399cfea-60ea-47f1-f031-a991b72a8ff6',
              'attrs': {'rect': {'fill': '#FFFFFF'}, 'text': {'text': 'OBESITY & AXIS'}}
            }, {
              'type': 'basic.Path',
              'size': {'width': 122, 'height': 32},
              'position': {'x': 208, 'y': 186},
              'angle': 0,
              'id': '7ac47aa7-b4e9-4d08-0f9a-3259bf249f92',
              'attrs': {
                'path': {'fill': '#CCCC00', 'd': 'M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z'},
                'text': {'text': 'Stimulation 0', 'ref-y': 0.3}
              }
            }, {
              'type': 'basic.Path',
              'size': {'width': 99, 'height': 32},
              'position': {'x': 380, 'y': 186},
              'angle': 0,
              'id': 'fe83c7fb-b4d9-4797-53b0-314ea64b1ca2',
              'attrs': {
                'path': {'fill': '#CCCC00', 'd': 'M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z'},
                'text': {'text': 'Subject 0', 'ref-y': 0.3}
              }
            }, {
              'type': 'basic.Rect',
              'position': {'x': 185.75, 'y': 84},
              'size': {'width': 77, 'height': 32},
              'angle': 0,
              'id': '959ebfba-510d-4d81-fbd7-296dd90968fa',
              'markup': '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" tooltipPlacement="top" tooltip="INTERMEDIATE_EXPERT" width="40pt" height="40pt"  viewBox="0 0 300 300"  preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#030303" stroke="none">\n                        <path class="node" id="node1" d="M1526 2694 c-223 -54 -386 -263 -386 -494 0 -140 50 -262 149 -360\n                        102 -102 218 -150 357 -150 146 0 258 46 359 145 72 70 109 133 136 230 103\n                        374 -235 721 -615 629z"></path>\n                        <path class="node" id="node2" d="M1249 1616 c-150 -45 -278 -138 -360 -263 -101 -152 -119 -249 -119\n                        -636 l0 -267 23 -9 c192 -77 639 -151 911 -151 276 0 610 62 776 143 l45 22\n                        -1 320 c-1 316 -1 321 -27 400 -73 223 -237 382 -458 444 -70 19 -98 21 -395\n                        20 -302 0 -323 -2 -395 -23z m549 -100 c5 -22 -75 -194 -98 -213 -9 -8 -10\n                        -12 -3 -13 13 0 13 -1 57 -620 4 -51 1 -60 -43 -127 -25 -40 -51 -75 -57 -77\n                        -6 -2 -31 30 -56 72 l-45 77 13 225 c17 289 32 443 45 451 6 3 3 11 -7 19 -9\n                        8 -36 56 -60 108 -59 125 -60 123 115 120 125 -3 136 -4 139 -22z"></path>\n                        </g>\n                        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#9E9E9E" stroke="none">\n                        \n                        <path class="node" id="node4" d="M1511 1526 c-9 -11 -2 -33 33 -108 24 -52 51 -100 60 -108 10 -8 13\n                        -16 7 -19 -13 -8 -28 -162 -45 -451 l-13 -225 45 -77 c25 -42 50 -74 56 -72 6\n                        2 32 37 57 77 44 67 47 76 43 127 -44 619 -44 620 -57 620 -7 1 -6 5 3 13 23\n                        19 103 191 98 213 -3 18 -14 19 -139 22 -108 2 -139 0 -148 -12z"></path>\n                        </g></svg> <text x="-10" y="100" font-size="14"></text>',
              'parent': '0399cfea-60ea-47f1-f031-a991b72a8ff6',
              'attrs': {'rect': {'fill': '#FFFFFF'}, 'text': {'text': 'Chloé'}}
            }, {
              'type': 'link',
              'source': {'id': '0399cfea-60ea-47f1-f031-a991b72a8ff6'},
              'target': {'id': '25d212c4-71a3-4a1a-04ad-5c3f35c41ff9'},
              'id': '57af3ce6-bd5e-4ce5-848c-797df2451326',
              'attrs': {
                '.marker-target': {'d': 'M 4 0 L 0 2 L 4 4 z'},
                '.link-tools': {'visibility': 'collapse'},
                '.marker-arrowheads': {'visibility': 'collapse'},
                '.marker-vertices': {'visibility': 'collapse'},
                '.labels': {'visibility': 'collapse'},
                '.connection-wrap': {'visibility': 'collapse'}
              }
            }, {
              'type': 'link',
              'source': {'id': 'fbcc3229-dd86-4f90-44d1-a57bc0168ba7'},
              'target': {'id': '0399cfea-60ea-47f1-f031-a991b72a8ff6'},
              'id': 'b49b8074-b87b-4dd2-aa9c-5c7072ae8be8',
              'attrs': {
                '.connection': {
                  'fill': 'none',
                  'stroke-linejoin': 'round',
                  'stroke-width': '2',
                  'stroke': '#4b4a67',
                  'stroke-dasharray': '1.5'
                },
                '.marker-target': {'fill': 'none'},
                '.link-tools': {'visibility': 'collapse'},
                '.marker-arrowheads': {'visibility': 'collapse'},
                '.marker-vertices': {'visibility': 'collapse'},
                '.labels': {'visibility': 'collapse'},
                '.connection-wrap': {'visibility': 'collapse'}
              }
            }, {
              'type': 'link',
              'source': {'id': '7ac47aa7-b4e9-4d08-0f9a-3259bf249f92'},
              'target': {'id': '0399cfea-60ea-47f1-f031-a991b72a8ff6'},
              'id': '96319dcf-0d11-4e08-bb34-1d7d6af5c034',
              'attrs': {
                '.marker-target': {'d': 'M 4 0 L 0 2 L 4 4 z'},
                '.link-tools': {'visibility': 'collapse'},
                '.marker-arrowheads': {'visibility': 'collapse'},
                '.marker-vertices': {'visibility': 'collapse'},
                '.labels': {'visibility': 'collapse'},
                '.connection-wrap': {'visibility': 'collapse'}
              }
            }, {
              'type': 'link',
              'source': {'id': 'fe83c7fb-b4d9-4797-53b0-314ea64b1ca2'},
              'target': {'id': '0399cfea-60ea-47f1-f031-a991b72a8ff6'},
              'id': '9bb1ca6f-4953-4f68-8ca8-f29733f577b6',
              'attrs': {
                '.marker-target': {'d': 'M 4 0 L 0 2 L 4 4 z'},
                '.link-tools': {'visibility': 'collapse'},
                '.marker-arrowheads': {'visibility': 'collapse'},
                '.marker-vertices': {'visibility': 'collapse'},
                '.labels': {'visibility': 'collapse'},
                '.connection-wrap': {'visibility': 'collapse'}
              }
            }, {
              'type': 'link',
              'source': {'id': '959ebfba-510d-4d81-fbd7-296dd90968fa'},
              'target': {'id': '0399cfea-60ea-47f1-f031-a991b72a8ff6'},
              'id': 'dd9b3e08-1ba9-4d7f-81ba-fa4931b03113',
              'attrs': {
                '.connection': {
                  'fill': 'none',
                  'stroke-linejoin': 'round',
                  'stroke-width': '2',
                  'stroke': '#4b4a67',
                  'stroke-dasharray': '1.5'
                },
                '.marker-target': {'fill': 'none'},
                '.link-tools': {'visibility': 'collapse'},
                '.marker-arrowheads': {'visibility': 'collapse'},
                '.marker-vertices': {'visibility': 'collapse'},
                '.labels': {'visibility': 'collapse'},
                '.connection-wrap': {'visibility': 'collapse'}
              }
            }]
          }
        }], 'currentIndex': 0
      };
      const result = {
        changeDate: new Date(),
        jsonBusinessSteps: {},
        businessSteps: {},
        graph: {}
      };

      Util.stateFromJSON(states, result, 0);

      const str = JSON.stringify(result.jsonBusinessSteps);

      expect((result.jsonBusinessSteps as any).length).toEqual(1);
      expect(((result.jsonBusinessSteps as any)[0].elements as any).length).toEqual(4);
    });

    it('Deserialize business elements', function () {

      const result = {
        changeDate: new Date(),
        jsonBusinessSteps: {},
        businessSteps: {},
        graph: {}
      };

      result.jsonBusinessSteps = [{
        'id': 'a1ee5a51-bc00-4c7d-5d53-616c76be216c',
        'elements': [{
          'elementType': 'Conclusion',
          'name': 'Experimentation',
          'description': '',
          'type': 'experimentation',
          'visualShapeId': '25d212c4-71a3-4a1a-04ad-5c3f35c41ff9',
          'jsonElement': [{
            'element': {
              'type': 'experimentation',
              'persistent': true,
              'stimulation': {
                'code': 'stimulation',
                'path': 'fr.axonic',
                'persistent': true,
                'stimulationScheduler': {
                  'code': 'scheduler',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'from': {
                    'code': 'from',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                  },
                  'to': {
                    'code': 'to',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                  }
                },
                'waveform': {
                  'code': 'waveform',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': 'RECTANGULAR',
                  'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                    'persistent': true,
                    'value': 'RAMP'
                  }]
                },
                'waveformParameter': {
                  'code': 'waveformParameters',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'amplitude': {
                    'type': 'aContinuousNumber',
                    'code': 'amplitude',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 1000.1}
                  },
                  'duration': {
                    'type': 'aContinuousNumber',
                    'code': 'duration',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'int', 'value': 300}
                  },
                  'frequency': {
                    'type': 'aContinuousNumber',
                    'code': 'frequency',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 500}
                  }
                }
              },
              'subject': {
                'code': 'subject',
                'path': 'fr.axonic',
                'persistent': true,
                'dynamicInformations': {
                  'code': 'dynamic',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
                  'weight': {
                    'code': 'weight',
                    'path': 'fr.axonic.subject.dynamic',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 130}
                  }
                },
                'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                'pathologyInformations': {
                  'code': 'pathology',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'beginningOfObesity': {
                    'code': 'beginningObesity',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                  },
                  'obesityType': {
                    'type': 'aRangedEnum',
                    'code': 'obesityType',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': 'GYNOID',
                    'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                      'persistent': true,
                      'value': 'MIXED'
                    }]
                  }
                },
                'staticInformations': {
                  'code': 'static',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'birthday': {
                    'code': 'birthday',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                  },
                  'gender': {
                    'type': 'aRangedEnum',
                    'code': 'gender',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': 'MALE',
                    'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                      'persistent': true,
                      'value': 'UNKNOWN'
                    }]
                  },
                  'height': {
                    'code': 'height',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 70.5}
                  },
                  'name': {
                    'code': 'name',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'string', 'value': 'Paul'}
                  }
                }
              }
            },
            'name': 'Experimentation',
            'limits': {
              'subject': [{
                'code': 'subject',
                'path': 'fr.axonic',
                'persistent': true,
                'dynamicInformations': {
                  'code': 'dynamic',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
                  'weight': {
                    'code': 'weight',
                    'path': 'fr.axonic.subject.dynamic',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 130}
                  }
                },
                'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                'pathologyInformations': {
                  'code': 'pathology',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'beginningOfObesity': {
                    'code': 'beginningObesity',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                  },
                  'obesityType': {
                    'type': 'aRangedEnum',
                    'code': 'obesityType',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': 'GYNOID',
                    'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                      'persistent': true,
                      'value': 'MIXED'
                    }]
                  }
                },
                'staticInformations': {
                  'code': 'static',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'birthday': {
                    'code': 'birthday',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                  },
                  'gender': {
                    'type': 'aRangedEnum',
                    'code': 'gender',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': 'MALE',
                    'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                      'persistent': true,
                      'value': 'UNKNOWN'
                    }]
                  },
                  'height': {
                    'code': 'height',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 70.5}
                  },
                  'name': {
                    'code': 'name',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'string', 'value': 'Paul'}
                  }
                }
              }],
              'stimulation': [{
                'code': 'stimulation',
                'path': 'fr.axonic',
                'persistent': true,
                'stimulationScheduler': {
                  'code': 'scheduler',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'from': {
                    'code': 'from',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                  },
                  'to': {
                    'code': 'to',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                  }
                },
                'waveform': {
                  'code': 'waveform',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': 'RECTANGULAR',
                  'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                    'persistent': true,
                    'value': 'RAMP'
                  }]
                },
                'waveformParameter': {
                  'code': 'waveformParameters',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'amplitude': {
                    'type': 'aContinuousNumber',
                    'code': 'amplitude',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 1000.1}
                  },
                  'duration': {
                    'type': 'aContinuousNumber',
                    'code': 'duration',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'int', 'value': 300}
                  },
                  'frequency': {
                    'type': 'aContinuousNumber',
                    'code': 'frequency',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 500}
                  }
                }
              }]
            }
          }],
          'artifacts': [{
            'elementType': 'Limitation',
            'name': 'subject',
            'description': '',
            'type': '',
            'jsonElement': [{
              'element': {
                'type': 'experimentation',
                'persistent': true,
                'stimulation': {
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                },
                'subject': {
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }
              },
              'name': 'Experimentation',
              'limits': {
                'subject': [{
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }],
                'stimulation': [{
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                }]
              }
            }]
          }, {
            'elementType': 'Limitation',
            'name': 'stimulation',
            'description': '',
            'type': '',
            'jsonElement': [{
              'element': {
                'type': 'experimentation',
                'persistent': true,
                'stimulation': {
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                },
                'subject': {
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }
              },
              'name': 'Experimentation',
              'limits': {
                'subject': [{
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }],
                'stimulation': [{
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                }]
              }
            }]
          }]
        }, {
          'elementType': 'Strategy',
          'name': 'Treat',
          'description': '',
          'type': 'humanStrategy',
          'visualShapeId': '0399cfea-60ea-47f1-f031-a991b72a8ff6',
          'jsonElement': [{
            'type': 'humanStrategy',
            'name': 'Treat',
            'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
            'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
            'minimumRole': 'TECHNICIAN'
          }],
          'artifacts': [{
            'elementType': 'Rationale',
            'name': 'OBESITY & AXIS',
            'description': '',
            'type': '',
            'visualShapeId': 'fbcc3229-dd86-4f90-44d1-a57bc0168ba7',
            'jsonElement': [{
              'type': 'humanStrategy',
              'name': 'Treat',
              'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
              'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
              'minimumRole': 'TECHNICIAN'
            }]
          }, {
            'elementType': 'Actor',
            'name': 'Chloé',
            'description': '',
            'type': 'INTERMEDIATE_EXPERT',
            'visualShapeId': '959ebfba-510d-4d81-fbd7-296dd90968fa',
            'jsonElement': [{
              'type': 'humanStrategy',
              'name': 'Treat',
              'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
              'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
              'minimumRole': 'TECHNICIAN'
            }]
          }]
        }, {
          'elementType': 'Evidence',
          'name': 'Stimulation 0',
          'description': '',
          'type': 'stimulation',
          'visualShapeId': '7ac47aa7-b4e9-4d08-0f9a-3259bf249f92',
          'jsonElement': [{
            'element': {
              'type': 'stimulation',
              'code': 'stimulation',
              'path': 'fr.axonic',
              'persistent': true,
              'stimulationScheduler': {
                'code': 'scheduler',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'from': {
                  'code': 'from',
                  'path': 'fr.axonic.stimulation.scheduler',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                },
                'to': {
                  'code': 'to',
                  'path': 'fr.axonic.stimulation.scheduler',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                }
              },
              'waveform': {
                'code': 'waveform',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': 'RECTANGULAR',
                'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                  'persistent': true,
                  'value': 'RAMP'
                }]
              },
              'waveformParameter': {
                'code': 'waveformParameters',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'amplitude': {
                  'type': 'aContinuousNumber',
                  'code': 'amplitude',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 1000.1}
                },
                'duration': {
                  'type': 'aContinuousNumber',
                  'code': 'duration',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': {'type': 'int', 'value': 300}
                },
                'frequency': {
                  'type': 'aContinuousNumber',
                  'code': 'frequency',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 500}
                }
              }
            }, 'name': 'Stimulation 0'
          }],
          'artifacts': []
        }, {
          'elementType': 'Evidence',
          'name': 'Subject 0',
          'description': '',
          'type': 'subject',
          'visualShapeId': 'fe83c7fb-b4d9-4797-53b0-314ea64b1ca2',
          'jsonElement': [{
            'element': {
              'type': 'subject',
              'code': 'subject',
              'path': 'fr.axonic',
              'persistent': true,
              'dynamicInformations': {
                'code': 'dynamic',
                'path': 'fr.axonic.subject',
                'persistent': true,
                'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
                'weight': {
                  'code': 'weight',
                  'path': 'fr.axonic.subject.dynamic',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 130}
                }
              },
              'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
              'pathologyInformations': {
                'code': 'pathology',
                'path': 'fr.axonic.subject',
                'persistent': true,
                'beginningOfObesity': {
                  'code': 'beginningObesity',
                  'path': 'fr.axonic.subject.pathology',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                },
                'obesityType': {
                  'type': 'aRangedEnum',
                  'code': 'obesityType',
                  'path': 'fr.axonic.subject.pathology',
                  'persistent': true,
                  'value': 'GYNOID',
                  'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                    'persistent': true,
                    'value': 'MIXED'
                  }]
                }
              },
              'staticInformations': {
                'code': 'static',
                'path': 'fr.axonic.subject',
                'persistent': true,
                'birthday': {
                  'code': 'birthday',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                },
                'gender': {
                  'type': 'aRangedEnum',
                  'code': 'gender',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': 'MALE',
                  'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                    'persistent': true,
                    'value': 'UNKNOWN'
                  }]
                },
                'height': {
                  'code': 'height',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 70.5}
                },
                'name': {
                  'code': 'name',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': {'type': 'string', 'value': 'Paul'}
                }
              }
            }, 'name': 'Subject 0'
          }],
          'artifacts': []
        }]
      }];

      Util.businessStepsFromJSON(result.jsonBusinessSteps, [], result);

      expect((result.businessSteps as any).length).toEqual(1);
      expect(((result.businessSteps as any)[0].items as any).length).toEqual(4);
    });

    it('Serialize current state', function () {
      const result = {
        changeDate: new Date(),
        jsonBusinessSteps: {},
        businessSteps: {},
        graph: {}
      };

      result.jsonBusinessSteps = [{
        'id': 'a1ee5a51-bc00-4c7d-5d53-616c76be216c',
        'elements': [{
          'elementType': 'Conclusion',
          'name': 'Experimentation',
          'description': '',
          'type': 'experimentation',
          'visualShapeId': '25d212c4-71a3-4a1a-04ad-5c3f35c41ff9',
          'jsonElement': [{
            'element': {
              'type': 'experimentation',
              'persistent': true,
              'stimulation': {
                'code': 'stimulation',
                'path': 'fr.axonic',
                'persistent': true,
                'stimulationScheduler': {
                  'code': 'scheduler',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'from': {
                    'code': 'from',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                  },
                  'to': {
                    'code': 'to',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                  }
                },
                'waveform': {
                  'code': 'waveform',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': 'RECTANGULAR',
                  'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                    'persistent': true,
                    'value': 'RAMP'
                  }]
                },
                'waveformParameter': {
                  'code': 'waveformParameters',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'amplitude': {
                    'type': 'aContinuousNumber',
                    'code': 'amplitude',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 1000.1}
                  },
                  'duration': {
                    'type': 'aContinuousNumber',
                    'code': 'duration',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'int', 'value': 300}
                  },
                  'frequency': {
                    'type': 'aContinuousNumber',
                    'code': 'frequency',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 500}
                  }
                }
              },
              'subject': {
                'code': 'subject',
                'path': 'fr.axonic',
                'persistent': true,
                'dynamicInformations': {
                  'code': 'dynamic',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
                  'weight': {
                    'code': 'weight',
                    'path': 'fr.axonic.subject.dynamic',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 130}
                  }
                },
                'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                'pathologyInformations': {
                  'code': 'pathology',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'beginningOfObesity': {
                    'code': 'beginningObesity',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                  },
                  'obesityType': {
                    'type': 'aRangedEnum',
                    'code': 'obesityType',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': 'GYNOID',
                    'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                      'persistent': true,
                      'value': 'MIXED'
                    }]
                  }
                },
                'staticInformations': {
                  'code': 'static',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'birthday': {
                    'code': 'birthday',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                  },
                  'gender': {
                    'type': 'aRangedEnum',
                    'code': 'gender',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': 'MALE',
                    'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                      'persistent': true,
                      'value': 'UNKNOWN'
                    }]
                  },
                  'height': {
                    'code': 'height',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 70.5}
                  },
                  'name': {
                    'code': 'name',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'string', 'value': 'Paul'}
                  }
                }
              }
            },
            'name': 'Experimentation',
            'limits': {
              'subject': [{
                'code': 'subject',
                'path': 'fr.axonic',
                'persistent': true,
                'dynamicInformations': {
                  'code': 'dynamic',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
                  'weight': {
                    'code': 'weight',
                    'path': 'fr.axonic.subject.dynamic',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 130}
                  }
                },
                'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                'pathologyInformations': {
                  'code': 'pathology',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'beginningOfObesity': {
                    'code': 'beginningObesity',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                  },
                  'obesityType': {
                    'type': 'aRangedEnum',
                    'code': 'obesityType',
                    'path': 'fr.axonic.subject.pathology',
                    'persistent': true,
                    'value': 'GYNOID',
                    'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                      'persistent': true,
                      'value': 'MIXED'
                    }]
                  }
                },
                'staticInformations': {
                  'code': 'static',
                  'path': 'fr.axonic.subject',
                  'persistent': true,
                  'birthday': {
                    'code': 'birthday',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                  },
                  'gender': {
                    'type': 'aRangedEnum',
                    'code': 'gender',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': 'MALE',
                    'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                      'persistent': true,
                      'value': 'UNKNOWN'
                    }]
                  },
                  'height': {
                    'code': 'height',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 70.5}
                  },
                  'name': {
                    'code': 'name',
                    'path': 'fr.axonic.subject.static',
                    'persistent': true,
                    'value': {'type': 'string', 'value': 'Paul'}
                  }
                }
              }],
              'stimulation': [{
                'code': 'stimulation',
                'path': 'fr.axonic',
                'persistent': true,
                'stimulationScheduler': {
                  'code': 'scheduler',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'from': {
                    'code': 'from',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                  },
                  'to': {
                    'code': 'to',
                    'path': 'fr.axonic.stimulation.scheduler',
                    'persistent': true,
                    'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                  }
                },
                'waveform': {
                  'code': 'waveform',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': 'RECTANGULAR',
                  'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                    'persistent': true,
                    'value': 'RAMP'
                  }]
                },
                'waveformParameter': {
                  'code': 'waveformParameters',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'amplitude': {
                    'type': 'aContinuousNumber',
                    'code': 'amplitude',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 1000.1}
                  },
                  'duration': {
                    'type': 'aContinuousNumber',
                    'code': 'duration',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'int', 'value': 300}
                  },
                  'frequency': {
                    'type': 'aContinuousNumber',
                    'code': 'frequency',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': {'type': 'double', 'value': 500}
                  }
                }
              }]
            }
          }],
          'artifacts': [{
            'elementType': 'Limitation',
            'name': 'subject',
            'description': '',
            'type': '',
            'jsonElement': [{
              'element': {
                'type': 'experimentation',
                'persistent': true,
                'stimulation': {
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                },
                'subject': {
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }
              },
              'name': 'Experimentation',
              'limits': {
                'subject': [{
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }],
                'stimulation': [{
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                }]
              }
            }]
          }, {
            'elementType': 'Limitation',
            'name': 'stimulation',
            'description': '',
            'type': '',
            'jsonElement': [{
              'element': {
                'type': 'experimentation',
                'persistent': true,
                'stimulation': {
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                },
                'subject': {
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }
              },
              'name': 'Experimentation',
              'limits': {
                'subject': [{
                  'code': 'subject',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'dynamicInformations': {
                    'code': 'dynamic',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'bmi': {
                      'code': 'bmi',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 40}
                    },
                    'weight': {
                      'code': 'weight',
                      'path': 'fr.axonic.subject.dynamic',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 130}
                    }
                  },
                  'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
                  'pathologyInformations': {
                    'code': 'pathology',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'beginningOfObesity': {
                      'code': 'beginningObesity',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                    },
                    'obesityType': {
                      'type': 'aRangedEnum',
                      'code': 'obesityType',
                      'path': 'fr.axonic.subject.pathology',
                      'persistent': true,
                      'value': 'GYNOID',
                      'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                        'persistent': true,
                        'value': 'MIXED'
                      }]
                    }
                  },
                  'staticInformations': {
                    'code': 'static',
                    'path': 'fr.axonic.subject',
                    'persistent': true,
                    'birthday': {
                      'code': 'birthday',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                    },
                    'gender': {
                      'type': 'aRangedEnum',
                      'code': 'gender',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': 'MALE',
                      'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                        'persistent': true,
                        'value': 'UNKNOWN'
                      }]
                    },
                    'height': {
                      'code': 'height',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 70.5}
                    },
                    'name': {
                      'code': 'name',
                      'path': 'fr.axonic.subject.static',
                      'persistent': true,
                      'value': {'type': 'string', 'value': 'Paul'}
                    }
                  }
                }],
                'stimulation': [{
                  'code': 'stimulation',
                  'path': 'fr.axonic',
                  'persistent': true,
                  'stimulationScheduler': {
                    'code': 'scheduler',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'from': {
                      'code': 'from',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                    },
                    'to': {
                      'code': 'to',
                      'path': 'fr.axonic.stimulation.scheduler',
                      'persistent': true,
                      'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                    }
                  },
                  'waveform': {
                    'code': 'waveform',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'value': 'RECTANGULAR',
                    'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                      'persistent': true,
                      'value': 'RAMP'
                    }]
                  },
                  'waveformParameter': {
                    'code': 'waveformParameters',
                    'path': 'fr.axonic.stimulation',
                    'persistent': true,
                    'amplitude': {
                      'type': 'aContinuousNumber',
                      'code': 'amplitude',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 1000.1}
                    },
                    'duration': {
                      'type': 'aContinuousNumber',
                      'code': 'duration',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'int', 'value': 300}
                    },
                    'frequency': {
                      'type': 'aContinuousNumber',
                      'code': 'frequency',
                      'path': 'fr.axonic.stimulation',
                      'persistent': true,
                      'value': {'type': 'double', 'value': 500}
                    }
                  }
                }]
              }
            }]
          }]
        }, {
          'elementType': 'Strategy',
          'name': 'Treat',
          'description': '',
          'type': 'humanStrategy',
          'visualShapeId': '0399cfea-60ea-47f1-f031-a991b72a8ff6',
          'jsonElement': [{
            'type': 'humanStrategy',
            'name': 'Treat',
            'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
            'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
            'minimumRole': 'TECHNICIAN'
          }],
          'artifacts': [{
            'elementType': 'Rationale',
            'name': 'OBESITY & AXIS',
            'description': '',
            'type': '',
            'visualShapeId': 'fbcc3229-dd86-4f90-44d1-a57bc0168ba7',
            'jsonElement': [{
              'type': 'humanStrategy',
              'name': 'Treat',
              'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
              'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
              'minimumRole': 'TECHNICIAN'
            }]
          }, {
            'elementType': 'Actor',
            'name': 'Chloé',
            'description': '',
            'type': 'INTERMEDIATE_EXPERT',
            'visualShapeId': '959ebfba-510d-4d81-fbd7-296dd90968fa',
            'jsonElement': [{
              'type': 'humanStrategy',
              'name': 'Treat',
              'rationale': {'axonicProject': {'pathology': 'OBESITY', 'stimulator': 'AXIS'}},
              'actor': {'name': 'Chloé', 'role': 'INTERMEDIATE_EXPERT'},
              'minimumRole': 'TECHNICIAN'
            }]
          }]
        }, {
          'elementType': 'Evidence',
          'name': 'Stimulation 0',
          'description': '',
          'type': 'stimulation',
          'visualShapeId': '7ac47aa7-b4e9-4d08-0f9a-3259bf249f92',
          'jsonElement': [{
            'element': {
              'type': 'stimulation',
              'code': 'stimulation',
              'path': 'fr.axonic',
              'persistent': true,
              'stimulationScheduler': {
                'code': 'scheduler',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'from': {
                  'code': 'from',
                  'path': 'fr.axonic.stimulation.scheduler',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.22+01:00'}
                },
                'to': {
                  'code': 'to',
                  'path': 'fr.axonic.stimulation.scheduler',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T12:19:35.22+01:00'}
                }
              },
              'waveform': {
                'code': 'waveform',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'value': 'RECTANGULAR',
                'range': [{'persistent': true, 'value': 'RECTANGULAR'}, {'persistent': true, 'value': 'SINUS'}, {
                  'persistent': true,
                  'value': 'RAMP'
                }]
              },
              'waveformParameter': {
                'code': 'waveformParameters',
                'path': 'fr.axonic.stimulation',
                'persistent': true,
                'amplitude': {
                  'type': 'aContinuousNumber',
                  'code': 'amplitude',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 1000.1}
                },
                'duration': {
                  'type': 'aContinuousNumber',
                  'code': 'duration',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': {'type': 'int', 'value': 300}
                },
                'frequency': {
                  'type': 'aContinuousNumber',
                  'code': 'frequency',
                  'path': 'fr.axonic.stimulation',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 500}
                }
              }
            }, 'name': 'Stimulation 0'
          }],
          'artifacts': []
        }, {
          'elementType': 'Evidence',
          'name': 'Subject 0',
          'description': '',
          'type': 'subject',
          'visualShapeId': 'fe83c7fb-b4d9-4797-53b0-314ea64b1ca2',
          'jsonElement': [{
            'element': {
              'type': 'subject',
              'code': 'subject',
              'path': 'fr.axonic',
              'persistent': true,
              'dynamicInformations': {
                'code': 'dynamic',
                'path': 'fr.axonic.subject',
                'persistent': true,
                'bmi': {'code': 'bmi', 'path': 'fr.axonic.subject.dynamic', 'persistent': true, 'value': {'type': 'double', 'value': 40}},
                'weight': {
                  'code': 'weight',
                  'path': 'fr.axonic.subject.dynamic',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 130}
                }
              },
              'id': {'code': 'id', 'path': 'fr.axonic.subject', 'persistent': true, 'value': {'type': 'string', 'value': '12345'}},
              'pathologyInformations': {
                'code': 'pathology',
                'path': 'fr.axonic.subject',
                'persistent': true,
                'beginningOfObesity': {
                  'code': 'beginningObesity',
                  'path': 'fr.axonic.subject.pathology',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.242+01:00'}
                },
                'obesityType': {
                  'type': 'aRangedEnum',
                  'code': 'obesityType',
                  'path': 'fr.axonic.subject.pathology',
                  'persistent': true,
                  'value': 'GYNOID',
                  'range': [{'persistent': true, 'value': 'ANDROID'}, {'persistent': true, 'value': 'GYNOID'}, {
                    'persistent': true,
                    'value': 'MIXED'
                  }]
                }
              },
              'staticInformations': {
                'code': 'static',
                'path': 'fr.axonic.subject',
                'persistent': true,
                'birthday': {
                  'code': 'birthday',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': {'type': 'dateTime', 'value': '2017-01-12T11:19:35.24+01:00'}
                },
                'gender': {
                  'type': 'aRangedEnum',
                  'code': 'gender',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': 'MALE',
                  'range': [{'persistent': true, 'value': 'MALE'}, {'persistent': true, 'value': 'FEMALE'}, {
                    'persistent': true,
                    'value': 'UNKNOWN'
                  }]
                },
                'height': {
                  'code': 'height',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': {'type': 'double', 'value': 70.5}
                },
                'name': {
                  'code': 'name',
                  'path': 'fr.axonic.subject.static',
                  'persistent': true,
                  'value': {'type': 'string', 'value': 'Paul'}
                }
              }
            }, 'name': 'Subject 0'
          }],
          'artifacts': []
        }]
      }];

      Util.businessStepsFromJSON(result.jsonBusinessSteps, [], result);

      const j = Util.stateToJSON(result.businessSteps as Array<Step>, {}, undefined);

      expect(j.currentIndex).toEqual(0);
      expect(j.previous[0].businessSteps[0].id).toEqual(result.jsonBusinessSteps[0].id);
      expect(j.previous[0].businessSteps[0].elements.length).toEqual(result.jsonBusinessSteps[0].elements.length);
    });
  });
});
