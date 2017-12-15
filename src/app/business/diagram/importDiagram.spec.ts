import {Artifact, Conclusion, DiagramElement, Evidence, LinkElement, Strategy, Support} from './diagram';
import {dia} from 'jointjs';
import {ParseDiagramElementsResult, ParseJson2DiagramElements} from './importDiagram';
import Cell = dia.Cell;

describe('importDiagram.', function () {

        describe('ParseJson2DiagramElements.', function () {
            const jsonTest2Step = {
                'steps' : {
                    'step' : [ {
                        'conclusion' : {
                            'element' : {
                                'type' : 'experimentation',
                                'persistent' : true,
                                'stimulation' : {
                                    'code' : 'stimulation',
                                    'path' : 'fr.axonic',
                                    'persistent' : true,
                                    'stimulationScheduler' : {
                                        'code' : 'scheduler',
                                        'path' : 'fr.axonic.stimulation',
                                        'persistent' : true,
                                        'from' : {
                                            'code' : 'from',
                                            'path' : 'fr.axonic.stimulation.scheduler',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T11:20:08.673+01:00'
                                            }
                                        },
                                        'to' : {
                                            'code' : 'to',
                                            'path' : 'fr.axonic.stimulation.scheduler',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T12:20:08.673+01:00'
                                            }
                                        }
                                    },
                                    'waveform' : {
                                        'code' : 'waveform',
                                        'path' : 'fr.axonic.stimulation',
                                        'persistent' : true,
                                        'value' : 'RECTANGULAR',
                                        'range' : [ {
                                            'persistent' : true,
                                            'value' : 'RECTANGULAR'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'SINUS'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'RAMP'
                                        } ]
                                    },
                                    'waveformParameter' : {
                                        'code' : 'waveformParameters',
                                        'path' : 'fr.axonic.stimulation',
                                        'persistent' : true,
                                        'amplitude' : {
                                            'type' : 'aContinuousNumber',
                                            'code' : 'amplitude',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 1000.1
                                            }
                                        },
                                        'duration' : {
                                            'type' : 'aContinuousNumber',
                                            'code' : 'duration',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'int',
                                                'value' : 300
                                            }
                                        },
                                        'frequency' : {
                                            'type' : 'aContinuousNumber',
                                            'code' : 'frequency',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 500.0
                                            }
                                        }
                                    }
                                },
                                'subject' : {
                                    'code' : 'subject',
                                    'path' : 'fr.axonic',
                                    'persistent' : true,
                                    'dynamicInformations' : {
                                        'code' : 'dynamic',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'bmi' : {
                                            'code' : 'bmi',
                                            'path' : 'fr.axonic.subject.dynamic',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 40.0
                                            }
                                        },
                                        'weight' : {
                                            'code' : 'weight',
                                            'path' : 'fr.axonic.subject.dynamic',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 130.0
                                            }
                                        }
                                    },
                                    'id' : {
                                        'code' : 'id',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'value' : {
                                            'type' : 'string',
                                            'value' : '12345'
                                        }
                                    },
                                    'pathologyInformations' : {
                                        'code' : 'pathology',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'beginningOfObesity' : {
                                            'code' : 'beginningObesity',
                                            'path' : 'fr.axonic.subject.pathology',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T11:20:08.694+01:00'
                                            }
                                        },
                                        'obesityType' : {
                                            'type' : 'aRangedEnum',
                                            'code' : 'obesityType',
                                            'path' : 'fr.axonic.subject.pathology',
                                            'persistent' : true,
                                            'value' : 'GYNOID',
                                            'range' : [ {
                                                'persistent' : true,
                                                'value' : 'ANDROID'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'GYNOID'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'MIXED'
                                            } ]
                                        }
                                    },
                                    'staticInformations' : {
                                        'code' : 'static',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'birthday' : {
                                            'code' : 'birthday',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T11:20:08.691+01:00'
                                            }
                                        },
                                        'gender' : {
                                            'type' : 'aRangedEnum',
                                            'code' : 'gender',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : 'MALE',
                                            'range' : [ {
                                                'persistent' : true,
                                                'value' : 'MALE'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'FEMALE'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'UNKNOWN'
                                            } ]
                                        },
                                        'height' : {
                                            'code' : 'height',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 70.5
                                            }
                                        },
                                        'name' : {
                                            'code' : 'name',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'string',
                                                'value' : 'Paul'
                                            }
                                        }
                                    }
                                }
                            },
                            'name' : 'Experimentation',
                            'limits' : {
                                'subject' : [ {
                                    'code' : 'subject',
                                    'path' : 'fr.axonic',
                                    'persistent' : true,
                                    'dynamicInformations' : {
                                        'code' : 'dynamic',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'bmi' : {
                                            'code' : 'bmi',
                                            'path' : 'fr.axonic.subject.dynamic',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 40.0
                                            }
                                        },
                                        'weight' : {
                                            'code' : 'weight',
                                            'path' : 'fr.axonic.subject.dynamic',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 130.0
                                            }
                                        }
                                    },
                                    'id' : {
                                        'code' : 'id',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'value' : {
                                            'type' : 'string',
                                            'value' : '12345'
                                        }
                                    },
                                    'pathologyInformations' : {
                                        'code' : 'pathology',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'beginningOfObesity' : {
                                            'code' : 'beginningObesity',
                                            'path' : 'fr.axonic.subject.pathology',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T11:20:08.694+01:00'
                                            }
                                        },
                                        'obesityType' : {
                                            'type' : 'aRangedEnum',
                                            'code' : 'obesityType',
                                            'path' : 'fr.axonic.subject.pathology',
                                            'persistent' : true,
                                            'value' : 'GYNOID',
                                            'range' : [ {
                                                'persistent' : true,
                                                'value' : 'ANDROID'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'GYNOID'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'MIXED'
                                            } ]
                                        }
                                    },
                                    'staticInformations' : {
                                        'code' : 'static',
                                        'path' : 'fr.axonic.subject',
                                        'persistent' : true,
                                        'birthday' : {
                                            'code' : 'birthday',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T11:20:08.691+01:00'
                                            }
                                        },
                                        'gender' : {
                                            'type' : 'aRangedEnum',
                                            'code' : 'gender',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : 'MALE',
                                            'range' : [ {
                                                'persistent' : true,
                                                'value' : 'MALE'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'FEMALE'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'UNKNOWN'
                                            } ]
                                        },
                                        'height' : {
                                            'code' : 'height',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 70.5
                                            }
                                        },
                                        'name' : {
                                            'code' : 'name',
                                            'path' : 'fr.axonic.subject.static',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'string',
                                                'value' : 'Paul'
                                            }
                                        }
                                    }
                                } ],
                                'stimulation' : [ {
                                    'code' : 'stimulation',
                                    'path' : 'fr.axonic',
                                    'persistent' : true,
                                    'stimulationScheduler' : {
                                        'code' : 'scheduler',
                                        'path' : 'fr.axonic.stimulation',
                                        'persistent' : true,
                                        'from' : {
                                            'code' : 'from',
                                            'path' : 'fr.axonic.stimulation.scheduler',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T11:20:08.673+01:00'
                                            }
                                        },
                                        'to' : {
                                            'code' : 'to',
                                            'path' : 'fr.axonic.stimulation.scheduler',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'dateTime',
                                                'value' : '2017-01-12T12:20:08.673+01:00'
                                            }
                                        }
                                    },
                                    'waveform' : {
                                        'code' : 'waveform',
                                        'path' : 'fr.axonic.stimulation',
                                        'persistent' : true,
                                        'value' : 'RECTANGULAR',
                                        'range' : [ {
                                            'persistent' : true,
                                            'value' : 'RECTANGULAR'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'SINUS'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'RAMP'
                                        } ]
                                    },
                                    'waveformParameter' : {
                                        'code' : 'waveformParameters',
                                        'path' : 'fr.axonic.stimulation',
                                        'persistent' : true,
                                        'amplitude' : {
                                            'type' : 'aContinuousNumber',
                                            'code' : 'amplitude',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 1000.1
                                            }
                                        },
                                        'duration' : {
                                            'type' : 'aContinuousNumber',
                                            'code' : 'duration',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'int',
                                                'value' : 300
                                            }
                                        },
                                        'frequency' : {
                                            'type' : 'aContinuousNumber',
                                            'code' : 'frequency',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'double',
                                                'value' : 500.0
                                            }
                                        }
                                    }
                                } ]
                            }
                        },
                        'evidences' : {
                            'evidenceRoles' : [ {
                                'evidence' : {
                                    'element' : {
                                        'type' : 'stimulation',
                                        'code' : 'stimulation',
                                        'path' : 'fr.axonic',
                                        'persistent' : true,
                                        'stimulationScheduler' : {
                                            'code' : 'scheduler',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'from' : {
                                                'code' : 'from',
                                                'path' : 'fr.axonic.stimulation.scheduler',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T11:20:08.673+01:00'
                                                }
                                            },
                                            'to' : {
                                                'code' : 'to',
                                                'path' : 'fr.axonic.stimulation.scheduler',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T12:20:08.673+01:00'
                                                }
                                            }
                                        },
                                        'waveform' : {
                                            'code' : 'waveform',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : 'RECTANGULAR',
                                            'range' : [ {
                                                'persistent' : true,
                                                'value' : 'RECTANGULAR'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'SINUS'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'RAMP'
                                            } ]
                                        },
                                        'waveformParameter' : {
                                            'code' : 'waveformParameters',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'amplitude' : {
                                                'type' : 'aContinuousNumber',
                                                'code' : 'amplitude',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 1000.1
                                                }
                                            },
                                            'duration' : {
                                                'type' : 'aContinuousNumber',
                                                'code' : 'duration',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'int',
                                                    'value' : 300
                                                }
                                            },
                                            'frequency' : {
                                                'type' : 'aContinuousNumber',
                                                'code' : 'frequency',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 500.0
                                                }
                                            }
                                        }
                                    },
                                    'name' : 'Stimulation 0'
                                },
                                'role' : 'stimulation'
                            }, {
                                'evidence' : {
                                    'element' : {
                                        'type' : 'subject',
                                        'code' : 'subject',
                                        'path' : 'fr.axonic',
                                        'persistent' : true,
                                        'dynamicInformations' : {
                                            'code' : 'dynamic',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'bmi' : {
                                                'code' : 'bmi',
                                                'path' : 'fr.axonic.subject.dynamic',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 40.0
                                                }
                                            },
                                            'weight' : {
                                                'code' : 'weight',
                                                'path' : 'fr.axonic.subject.dynamic',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 130.0
                                                }
                                            }
                                        },
                                        'id' : {
                                            'code' : 'id',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'string',
                                                'value' : '12345'
                                            }
                                        },
                                        'pathologyInformations' : {
                                            'code' : 'pathology',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'beginningOfObesity' : {
                                                'code' : 'beginningObesity',
                                                'path' : 'fr.axonic.subject.pathology',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T11:20:08.694+01:00'
                                                }
                                            },
                                            'obesityType' : {
                                                'type' : 'aRangedEnum',
                                                'code' : 'obesityType',
                                                'path' : 'fr.axonic.subject.pathology',
                                                'persistent' : true,
                                                'value' : 'GYNOID',
                                                'range' : [ {
                                                    'persistent' : true,
                                                    'value' : 'ANDROID'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'GYNOID'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'MIXED'
                                                } ]
                                            }
                                        },
                                        'staticInformations' : {
                                            'code' : 'static',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'birthday' : {
                                                'code' : 'birthday',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T11:20:08.691+01:00'
                                                }
                                            },
                                            'gender' : {
                                                'type' : 'aRangedEnum',
                                                'code' : 'gender',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : 'MALE',
                                                'range' : [ {
                                                    'persistent' : true,
                                                    'value' : 'MALE'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'FEMALE'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'UNKNOWN'
                                                } ]
                                            },
                                            'height' : {
                                                'code' : 'height',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 70.5
                                                }
                                            },
                                            'name' : {
                                                'code' : 'name',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'string',
                                                    'value' : 'Paul'
                                                }
                                            }
                                        }
                                    },
                                    'name' : 'Subject 0'
                                },
                                'role' : 'subject'
                            } ]
                        },
                        'strategy' : {
                            'type' : 'humanStrategy',
                            'name' : 'Treat',
                            'rationale' : {
                                'axonicProject' : {
                                    'pathology' : 'OBESITY',
                                    'stimulator' : 'AXIS'
                                }
                            },
                            'actor' : {
                                'name' : 'Chloé',
                                'role' : 'INTERMEDIATE_EXPERT'
                            },
                            'minimumRole' : 'TECHNICIAN'
                        }
                    }, {
                        'conclusion' : {
                            'element' : {
                                'type' : 'establishedEffect',
                                'persistent' : true,
                                'effects' : [ {
                                    'persistent' : true,
                                    'effectType' : {
                                        'code' : 'effectType',
                                        'path' : 'fr.axonic',
                                        'persistent' : true,
                                        'value' : 'UNKNOWN',
                                        'range' : [ {
                                            'persistent' : true,
                                            'value' : 'EFFICIENT'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'UNDESIRABLE'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'STRONGLY_UNDESIRABLE'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'UNKNOWN'
                                        } ]
                                    }
                                }, {
                                    'persistent' : true,
                                    'effectType' : {
                                        'code' : 'effectType',
                                        'path' : 'fr.axonic',
                                        'persistent' : true,
                                        'value' : 'UNDESIRABLE',
                                        'range' : [ {
                                            'persistent' : true,
                                            'value' : 'EFFICIENT'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'UNDESIRABLE'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'STRONGLY_UNDESIRABLE'
                                        }, {
                                            'persistent' : true,
                                            'value' : 'UNKNOWN'
                                        } ]
                                    }
                                } ],
                                'experimentation' : {
                                    'persistent' : true,
                                    'stimulation' : {
                                        'code' : 'stimulation',
                                        'path' : 'fr.axonic',
                                        'persistent' : true,
                                        'stimulationScheduler' : {
                                            'code' : 'scheduler',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'from' : {
                                                'code' : 'from',
                                                'path' : 'fr.axonic.stimulation.scheduler',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T11:20:08.673+01:00'
                                                }
                                            },
                                            'to' : {
                                                'code' : 'to',
                                                'path' : 'fr.axonic.stimulation.scheduler',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T12:20:08.673+01:00'
                                                }
                                            }
                                        },
                                        'waveform' : {
                                            'code' : 'waveform',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'value' : 'RECTANGULAR',
                                            'range' : [ {
                                                'persistent' : true,
                                                'value' : 'RECTANGULAR'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'SINUS'
                                            }, {
                                                'persistent' : true,
                                                'value' : 'RAMP'
                                            } ]
                                        },
                                        'waveformParameter' : {
                                            'code' : 'waveformParameters',
                                            'path' : 'fr.axonic.stimulation',
                                            'persistent' : true,
                                            'amplitude' : {
                                                'type' : 'aContinuousNumber',
                                                'code' : 'amplitude',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 1000.1
                                                }
                                            },
                                            'duration' : {
                                                'type' : 'aContinuousNumber',
                                                'code' : 'duration',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'int',
                                                    'value' : 300
                                                }
                                            },
                                            'frequency' : {
                                                'type' : 'aContinuousNumber',
                                                'code' : 'frequency',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 500.0
                                                }
                                            }
                                        }
                                    },
                                    'subject' : {
                                        'code' : 'subject',
                                        'path' : 'fr.axonic',
                                        'persistent' : true,
                                        'dynamicInformations' : {
                                            'code' : 'dynamic',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'bmi' : {
                                                'code' : 'bmi',
                                                'path' : 'fr.axonic.subject.dynamic',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 40.0
                                                }
                                            },
                                            'weight' : {
                                                'code' : 'weight',
                                                'path' : 'fr.axonic.subject.dynamic',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 130.0
                                                }
                                            }
                                        },
                                        'id' : {
                                            'code' : 'id',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'value' : {
                                                'type' : 'string',
                                                'value' : '12345'
                                            }
                                        },
                                        'pathologyInformations' : {
                                            'code' : 'pathology',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'beginningOfObesity' : {
                                                'code' : 'beginningObesity',
                                                'path' : 'fr.axonic.subject.pathology',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T11:20:08.694+01:00'
                                                }
                                            },
                                            'obesityType' : {
                                                'type' : 'aRangedEnum',
                                                'code' : 'obesityType',
                                                'path' : 'fr.axonic.subject.pathology',
                                                'persistent' : true,
                                                'value' : 'GYNOID',
                                                'range' : [ {
                                                    'persistent' : true,
                                                    'value' : 'ANDROID'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'GYNOID'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'MIXED'
                                                } ]
                                            }
                                        },
                                        'staticInformations' : {
                                            'code' : 'static',
                                            'path' : 'fr.axonic.subject',
                                            'persistent' : true,
                                            'birthday' : {
                                                'code' : 'birthday',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'dateTime',
                                                    'value' : '2017-01-12T11:20:08.691+01:00'
                                                }
                                            },
                                            'gender' : {
                                                'type' : 'aRangedEnum',
                                                'code' : 'gender',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : 'MALE',
                                                'range' : [ {
                                                    'persistent' : true,
                                                    'value' : 'MALE'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'FEMALE'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'UNKNOWN'
                                                } ]
                                            },
                                            'height' : {
                                                'code' : 'height',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'double',
                                                    'value' : 70.5
                                                }
                                            },
                                            'name' : {
                                                'code' : 'name',
                                                'path' : 'fr.axonic.subject.static',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'string',
                                                    'value' : 'Paul'
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            'name' : 'Establish Effect'
                        },
                        'evidences' : {
                            'evidenceRoles' : [ {
                                'evidence' : {
                                    'type' : 'conclusion',
                                    'element' : {
                                        'type' : 'experimentation',
                                        'persistent' : true,
                                        'stimulation' : {
                                            'code' : 'stimulation',
                                            'path' : 'fr.axonic',
                                            'persistent' : true,
                                            'stimulationScheduler' : {
                                                'code' : 'scheduler',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'from' : {
                                                    'code' : 'from',
                                                    'path' : 'fr.axonic.stimulation.scheduler',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T11:20:08.673+01:00'
                                                    }
                                                },
                                                'to' : {
                                                    'code' : 'to',
                                                    'path' : 'fr.axonic.stimulation.scheduler',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T12:20:08.673+01:00'
                                                    }
                                                }
                                            },
                                            'waveform' : {
                                                'code' : 'waveform',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : 'RECTANGULAR',
                                                'range' : [ {
                                                    'persistent' : true,
                                                    'value' : 'RECTANGULAR'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'SINUS'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'RAMP'
                                                } ]
                                            },
                                            'waveformParameter' : {
                                                'code' : 'waveformParameters',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'amplitude' : {
                                                    'type' : 'aContinuousNumber',
                                                    'code' : 'amplitude',
                                                    'path' : 'fr.axonic.stimulation',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 1000.1
                                                    }
                                                },
                                                'duration' : {
                                                    'type' : 'aContinuousNumber',
                                                    'code' : 'duration',
                                                    'path' : 'fr.axonic.stimulation',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'int',
                                                        'value' : 300
                                                    }
                                                },
                                                'frequency' : {
                                                    'type' : 'aContinuousNumber',
                                                    'code' : 'frequency',
                                                    'path' : 'fr.axonic.stimulation',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 500.0
                                                    }
                                                }
                                            }
                                        },
                                        'subject' : {
                                            'code' : 'subject',
                                            'path' : 'fr.axonic',
                                            'persistent' : true,
                                            'dynamicInformations' : {
                                                'code' : 'dynamic',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'bmi' : {
                                                    'code' : 'bmi',
                                                    'path' : 'fr.axonic.subject.dynamic',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 40.0
                                                    }
                                                },
                                                'weight' : {
                                                    'code' : 'weight',
                                                    'path' : 'fr.axonic.subject.dynamic',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 130.0
                                                    }
                                                }
                                            },
                                            'id' : {
                                                'code' : 'id',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'string',
                                                    'value' : '12345'
                                                }
                                            },
                                            'pathologyInformations' : {
                                                'code' : 'pathology',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'beginningOfObesity' : {
                                                    'code' : 'beginningObesity',
                                                    'path' : 'fr.axonic.subject.pathology',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T11:20:08.694+01:00'
                                                    }
                                                },
                                                'obesityType' : {
                                                    'type' : 'aRangedEnum',
                                                    'code' : 'obesityType',
                                                    'path' : 'fr.axonic.subject.pathology',
                                                    'persistent' : true,
                                                    'value' : 'GYNOID',
                                                    'range' : [ {
                                                        'persistent' : true,
                                                        'value' : 'ANDROID'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'GYNOID'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'MIXED'
                                                    } ]
                                                }
                                            },
                                            'staticInformations' : {
                                                'code' : 'static',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'birthday' : {
                                                    'code' : 'birthday',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T11:20:08.691+01:00'
                                                    }
                                                },
                                                'gender' : {
                                                    'type' : 'aRangedEnum',
                                                    'code' : 'gender',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : 'MALE',
                                                    'range' : [ {
                                                        'persistent' : true,
                                                        'value' : 'MALE'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'FEMALE'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'UNKNOWN'
                                                    } ]
                                                },
                                                'height' : {
                                                    'code' : 'height',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 70.5
                                                    }
                                                },
                                                'name' : {
                                                    'code' : 'name',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'string',
                                                        'value' : 'Paul'
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    'name' : 'Experimentation',
                                    'limits' : {
                                        'subject' : [ {
                                            'code' : 'subject',
                                            'path' : 'fr.axonic',
                                            'persistent' : true,
                                            'dynamicInformations' : {
                                                'code' : 'dynamic',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'bmi' : {
                                                    'code' : 'bmi',
                                                    'path' : 'fr.axonic.subject.dynamic',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 40.0
                                                    }
                                                },
                                                'weight' : {
                                                    'code' : 'weight',
                                                    'path' : 'fr.axonic.subject.dynamic',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 130.0
                                                    }
                                                }
                                            },
                                            'id' : {
                                                'code' : 'id',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'value' : {
                                                    'type' : 'string',
                                                    'value' : '12345'
                                                }
                                            },
                                            'pathologyInformations' : {
                                                'code' : 'pathology',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'beginningOfObesity' : {
                                                    'code' : 'beginningObesity',
                                                    'path' : 'fr.axonic.subject.pathology',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T11:20:08.694+01:00'
                                                    }
                                                },
                                                'obesityType' : {
                                                    'type' : 'aRangedEnum',
                                                    'code' : 'obesityType',
                                                    'path' : 'fr.axonic.subject.pathology',
                                                    'persistent' : true,
                                                    'value' : 'GYNOID',
                                                    'range' : [ {
                                                        'persistent' : true,
                                                        'value' : 'ANDROID'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'GYNOID'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'MIXED'
                                                    } ]
                                                }
                                            },
                                            'staticInformations' : {
                                                'code' : 'static',
                                                'path' : 'fr.axonic.subject',
                                                'persistent' : true,
                                                'birthday' : {
                                                    'code' : 'birthday',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T11:20:08.691+01:00'
                                                    }
                                                },
                                                'gender' : {
                                                    'type' : 'aRangedEnum',
                                                    'code' : 'gender',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : 'MALE',
                                                    'range' : [ {
                                                        'persistent' : true,
                                                        'value' : 'MALE'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'FEMALE'
                                                    }, {
                                                        'persistent' : true,
                                                        'value' : 'UNKNOWN'
                                                    } ]
                                                },
                                                'height' : {
                                                    'code' : 'height',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 70.5
                                                    }
                                                },
                                                'name' : {
                                                    'code' : 'name',
                                                    'path' : 'fr.axonic.subject.static',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'string',
                                                        'value' : 'Paul'
                                                    }
                                                }
                                            }
                                        } ],
                                        'stimulation' : [ {
                                            'code' : 'stimulation',
                                            'path' : 'fr.axonic',
                                            'persistent' : true,
                                            'stimulationScheduler' : {
                                                'code' : 'scheduler',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'from' : {
                                                    'code' : 'from',
                                                    'path' : 'fr.axonic.stimulation.scheduler',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T11:20:08.673+01:00'
                                                    }
                                                },
                                                'to' : {
                                                    'code' : 'to',
                                                    'path' : 'fr.axonic.stimulation.scheduler',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'dateTime',
                                                        'value' : '2017-01-12T12:20:08.673+01:00'
                                                    }
                                                }
                                            },
                                            'waveform' : {
                                                'code' : 'waveform',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'value' : 'RECTANGULAR',
                                                'range' : [ {
                                                    'persistent' : true,
                                                    'value' : 'RECTANGULAR'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'SINUS'
                                                }, {
                                                    'persistent' : true,
                                                    'value' : 'RAMP'
                                                } ]
                                            },
                                            'waveformParameter' : {
                                                'code' : 'waveformParameters',
                                                'path' : 'fr.axonic.stimulation',
                                                'persistent' : true,
                                                'amplitude' : {
                                                    'type' : 'aContinuousNumber',
                                                    'code' : 'amplitude',
                                                    'path' : 'fr.axonic.stimulation',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 1000.1
                                                    }
                                                },
                                                'duration' : {
                                                    'type' : 'aContinuousNumber',
                                                    'code' : 'duration',
                                                    'path' : 'fr.axonic.stimulation',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'int',
                                                        'value' : 300
                                                    }
                                                },
                                                'frequency' : {
                                                    'type' : 'aContinuousNumber',
                                                    'code' : 'frequency',
                                                    'path' : 'fr.axonic.stimulation',
                                                    'persistent' : true,
                                                    'value' : {
                                                        'type' : 'double',
                                                        'value' : 500.0
                                                    }
                                                }
                                            }
                                        } ]
                                    }
                                },
                                'role' : ''
                            } ]
                        },
                        'strategy' : {
                            'type' : 'humanStrategy',
                            'name' : 'Establish Effect',
                            'rationale' : {
                                'axonicProject' : {
                                    'pathology' : 'OBESITY',
                                    'stimulator' : 'AXIS'
                                }
                            },
                            'actor' : {
                                'name' : 'Chloé',
                                'role' : 'INTERMEDIATE_EXPERT'
                            },
                            'minimumRole' : 'JUNIOR_EXPERT'
                        }
                    } ]
                }
            };

            let parse;
            let deResult:  ParseDiagramElementsResult;
            let nb: number;

            beforeEach(() => {
                parse  = new ParseJson2DiagramElements(jsonTest2Step);
                deResult = parse.getDiagramElements();
                nb = 0;
            });

            it('Return some elements', function () {
                expect(deResult.listElements.length).toBeGreaterThan(0);
            });

            it('Number of Conclusions', function () {
                for (const el of deResult.listElements) {
                    if (el instanceof Conclusion)
                    nb++;
                }
                expect(nb).toEqual(1);
            });

            it('Number of Strategies', function () {
                for (const el of deResult.listElements) {
                    if (el instanceof Strategy)
                        nb++;
                }
                expect(nb).toEqual(2);
            });

            it('Number of Evidences', function () {
                for (const el of deResult.listElements) {
                    if (el instanceof Evidence)
                        nb++;
                }
                expect(nb).toEqual(2);
            });

            it('Number of Supports (Evidence and Conclusion in the same time)', function () {
                for (const el of deResult.listElements) {
                    if (el instanceof Support)
                        nb++;
                }
                expect(nb).toEqual(1);
            });

            it('Each element have a property visualShape typed Cell (JointJS) witch have a parent property typed : DiagramElement (Business)', () => {
                let allElementOk = true;
                for (const el of deResult.listElements) {
                    if (!(el instanceof Artifact) && !(el instanceof LinkElement)) {
                        if (!(el.visualShape instanceof Cell))
                            allElementOk = false;
                        if (!((el.visualShape as any).parent instanceof DiagramElement))
                            allElementOk = false;
                    }
                }
                expect(allElementOk).toEqual(true);
            });

            it('Business list. Number of steps', function () {
                expect(deResult.businessSteps.length).toEqual(2);
            });

            it('Business list. Number of Evidences in one step', function () {
                for (const el of deResult.businessSteps[0].items) {
                    if (el instanceof Evidence)
                        nb++;
                }
                expect(nb).toEqual(2);
            });
        });
    });
