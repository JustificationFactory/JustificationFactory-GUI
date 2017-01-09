///<reference path="../../typings/globals/testing/index.d.ts"/>
///<reference path="../../app/services/diagram.ts"/>


define(['app/services/importDiagram.js'], function(ImportDiagram) {
    describe("importDiagram", function () {

        describe("ParseJson2DiagramElements", function () {
            var jsonTest2Step = {
                "root": {
                    "steps": [
                        {
                            "step": [
                                {
                                    "conclusion": [
                                        {
                                            "element": [
                                                {
                                                    "$": {
                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                        "xsi:type": "experimentation"
                                                    },
                                                    "persistent": [
                                                        "true"
                                                    ],
                                                    "stimulation": [
                                                        {
                                                            "code": [
                                                                "stimulation"
                                                            ],
                                                            "path": [
                                                                "fr.axonic"
                                                            ],
                                                            "persistent": [
                                                                "true"
                                                            ],
                                                            "stimulationScheduler": [
                                                                {
                                                                    "code": [
                                                                        "scheduler"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.stimulation"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "from": [
                                                                        {
                                                                            "code": [
                                                                                "from"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation.scheduler"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T10:36:55.694+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "to": [
                                                                        {
                                                                            "code": [
                                                                                "to"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation.scheduler"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T11:36:55.694+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "waveform": [
                                                                {
                                                                    "code": [
                                                                        "waveform"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.stimulation"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "value": [
                                                                        {
                                                                            "_": "RECTANGULAR",
                                                                            "$": {
                                                                                "xsi:type": "waveformEnum"
                                                                            }
                                                                        }
                                                                    ],
                                                                    "range": [
                                                                        {
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "RECTANGULAR",
                                                                                    "$": {
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "SINUS",
                                                                                    "$": {
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "RAMP",
                                                                                    "$": {
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "waveformParameter": [
                                                                {
                                                                    "code": [
                                                                        "waveformParameters"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.stimulation"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "amplitude": [
                                                                        {
                                                                            "$": {
                                                                                "xsi:type": "aContinuousNumber"
                                                                            },
                                                                            "code": [
                                                                                "amplitude"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "1000.1",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "duration": [
                                                                        {
                                                                            "$": {
                                                                                "xsi:type": "aContinuousNumber"
                                                                            },
                                                                            "code": [
                                                                                "duration"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "300",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:int"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "frequency": [
                                                                        {
                                                                            "$": {
                                                                                "xsi:type": "aContinuousNumber"
                                                                            },
                                                                            "code": [
                                                                                "frequency"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "500.0",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "subject": [
                                                        {
                                                            "code": [
                                                                "subject"
                                                            ],
                                                            "path": [
                                                                "fr.axonic"
                                                            ],
                                                            "persistent": [
                                                                "true"
                                                            ],
                                                            "dynamicInformations": [
                                                                {
                                                                    "code": [
                                                                        "dynamic"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "bmi": [
                                                                        {
                                                                            "code": [
                                                                                "bmi"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.dynamic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "40.0",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "weight": [
                                                                        {
                                                                            "code": [
                                                                                "weight"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.dynamic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "130.0",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "id": [
                                                                {
                                                                    "code": [
                                                                        "id"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "value": [
                                                                        {
                                                                            "_": "12345",
                                                                            "$": {
                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                "xsi:type": "xs:string"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "pathologyInformations": [
                                                                {
                                                                    "code": [
                                                                        "pathology"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "beginningOfObesity": [
                                                                        {
                                                                            "code": [
                                                                                "beginningObesity"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.pathology"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T10:36:55.712+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "obesityType": [
                                                                        {
                                                                            "$": {
                                                                                "xsi:type": "aRangedEnum"
                                                                            },
                                                                            "code": [
                                                                                "obesityType"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.pathology"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "GYNOID",
                                                                                    "$": {
                                                                                        "xsi:type": "obesityType"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "range": [
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "ANDROID",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "GYNOID",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "MIXED",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "staticInformations": [
                                                                {
                                                                    "code": [
                                                                        "static"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "birthday": [
                                                                        {
                                                                            "code": [
                                                                                "birthday"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T10:36:55.709+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "gender": [
                                                                        {
                                                                            "$": {
                                                                                "xsi:type": "aRangedEnum"
                                                                            },
                                                                            "code": [
                                                                                "gender"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "MALE",
                                                                                    "$": {
                                                                                        "xsi:type": "gender"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "range": [
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "MALE",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "FEMALE",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "UNKNOWN",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "height": [
                                                                        {
                                                                            "code": [
                                                                                "height"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "70.5",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "name": [
                                                                        {
                                                                            "code": [
                                                                                "name"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "Paul",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:string"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "name": [
                                                "Experimentation"
                                            ],
                                            "limits": [
                                                {
                                                    "subject": [
                                                        {
                                                            "code": [
                                                                "subject"
                                                            ],
                                                            "path": [
                                                                "fr.axonic"
                                                            ],
                                                            "persistent": [
                                                                "true"
                                                            ],
                                                            "dynamicInformations": [
                                                                {
                                                                    "code": [
                                                                        "dynamic"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "bmi": [
                                                                        {
                                                                            "code": [
                                                                                "bmi"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.dynamic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "40.0",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "weight": [
                                                                        {
                                                                            "code": [
                                                                                "weight"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.dynamic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "130.0",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "id": [
                                                                {
                                                                    "code": [
                                                                        "id"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "value": [
                                                                        {
                                                                            "_": "12345",
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                "xsi:type": "xs:string"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "pathologyInformations": [
                                                                {
                                                                    "code": [
                                                                        "pathology"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "beginningOfObesity": [
                                                                        {
                                                                            "code": [
                                                                                "beginningObesity"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.pathology"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T10:36:55.712+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "obesityType": [
                                                                        {
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xsi:type": "aRangedEnum"
                                                                            },
                                                                            "code": [
                                                                                "obesityType"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.pathology"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "GYNOID",
                                                                                    "$": {
                                                                                        "xsi:type": "obesityType"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "range": [
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "ANDROID",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "GYNOID",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "MIXED",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "staticInformations": [
                                                                {
                                                                    "code": [
                                                                        "static"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.subject"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "birthday": [
                                                                        {
                                                                            "code": [
                                                                                "birthday"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T10:36:55.709+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "gender": [
                                                                        {
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xsi:type": "aRangedEnum"
                                                                            },
                                                                            "code": [
                                                                                "gender"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "MALE",
                                                                                    "$": {
                                                                                        "xsi:type": "gender"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "range": [
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "MALE",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "FEMALE",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "UNKNOWN",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "height": [
                                                                        {
                                                                            "code": [
                                                                                "height"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "70.5",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "name": [
                                                                        {
                                                                            "code": [
                                                                                "name"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject.static"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "Paul",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:string"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "stimulation": [
                                                        {
                                                            "code": [
                                                                "stimulation"
                                                            ],
                                                            "path": [
                                                                "fr.axonic"
                                                            ],
                                                            "persistent": [
                                                                "true"
                                                            ],
                                                            "stimulationScheduler": [
                                                                {
                                                                    "code": [
                                                                        "scheduler"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.stimulation"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "from": [
                                                                        {
                                                                            "code": [
                                                                                "from"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation.scheduler"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T10:36:55.694+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "to": [
                                                                        {
                                                                            "code": [
                                                                                "to"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation.scheduler"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "2016-10-27T11:36:55.694+02:00",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:dateTime"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "waveform": [
                                                                {
                                                                    "code": [
                                                                        "waveform"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.stimulation"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "value": [
                                                                        {
                                                                            "_": "RECTANGULAR",
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xsi:type": "waveformEnum"
                                                                            }
                                                                        }
                                                                    ],
                                                                    "range": [
                                                                        {
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "RECTANGULAR",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "SINUS",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "RAMP",
                                                                                    "$": {
                                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "waveformParameter": [
                                                                {
                                                                    "code": [
                                                                        "waveformParameters"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic.stimulation"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "amplitude": [
                                                                        {
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xsi:type": "aContinuousNumber"
                                                                            },
                                                                            "code": [
                                                                                "amplitude"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "1000.1",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "duration": [
                                                                        {
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xsi:type": "aContinuousNumber"
                                                                            },
                                                                            "code": [
                                                                                "duration"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "300",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:int"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "frequency": [
                                                                        {
                                                                            "$": {
                                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                                "xsi:type": "aContinuousNumber"
                                                                            },
                                                                            "code": [
                                                                                "frequency"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "500.0",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:double"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    "evidences": [
                                        {
                                            "evidenceRoles": [
                                                {
                                                    "evidence": [
                                                        {
                                                            "element": [
                                                                {
                                                                    "$": {
                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                        "xsi:type": "stimulation"
                                                                    },
                                                                    "code": [
                                                                        "stimulation"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "stimulationScheduler": [
                                                                        {
                                                                            "code": [
                                                                                "scheduler"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "from": [
                                                                                {
                                                                                    "code": [
                                                                                        "from"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation.scheduler"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T10:36:55.694+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "to": [
                                                                                {
                                                                                    "code": [
                                                                                        "to"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation.scheduler"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T11:36:55.694+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "waveform": [
                                                                        {
                                                                            "code": [
                                                                                "waveform"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "RECTANGULAR",
                                                                                    "$": {
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "range": [
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "RECTANGULAR",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "SINUS",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "RAMP",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "waveformParameter": [
                                                                        {
                                                                            "code": [
                                                                                "waveformParameters"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "amplitude": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aContinuousNumber"
                                                                                    },
                                                                                    "code": [
                                                                                        "amplitude"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "1000.1",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "duration": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aContinuousNumber"
                                                                                    },
                                                                                    "code": [
                                                                                        "duration"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "300",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:int"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "frequency": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aContinuousNumber"
                                                                                    },
                                                                                    "code": [
                                                                                        "frequency"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "500.0",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "name": [
                                                                "Stimulation 0"
                                                            ]
                                                        }
                                                    ],
                                                    "role": [
                                                        "stimulation"
                                                    ]
                                                },
                                                {
                                                    "evidence": [
                                                        {
                                                            "element": [
                                                                {
                                                                    "$": {
                                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                        "xsi:type": "subject"
                                                                    },
                                                                    "code": [
                                                                        "subject"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "dynamicInformations": [
                                                                        {
                                                                            "code": [
                                                                                "dynamic"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "bmi": [
                                                                                {
                                                                                    "code": [
                                                                                        "bmi"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.dynamic"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "40.0",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "weight": [
                                                                                {
                                                                                    "code": [
                                                                                        "weight"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.dynamic"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "130.0",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "id": [
                                                                        {
                                                                            "code": [
                                                                                "id"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "12345",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:string"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "pathologyInformations": [
                                                                        {
                                                                            "code": [
                                                                                "pathology"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "beginningOfObesity": [
                                                                                {
                                                                                    "code": [
                                                                                        "beginningObesity"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.pathology"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T10:36:55.712+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "obesityType": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aRangedEnum"
                                                                                    },
                                                                                    "code": [
                                                                                        "obesityType"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.pathology"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "GYNOID",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "range": [
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "ANDROID",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "GYNOID",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "MIXED",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "staticInformations": [
                                                                        {
                                                                            "code": [
                                                                                "static"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "birthday": [
                                                                                {
                                                                                    "code": [
                                                                                        "birthday"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T10:36:55.709+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "gender": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aRangedEnum"
                                                                                    },
                                                                                    "code": [
                                                                                        "gender"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "MALE",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "range": [
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "MALE",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "FEMALE",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "UNKNOWN",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "height": [
                                                                                {
                                                                                    "code": [
                                                                                        "height"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "70.5",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "name": [
                                                                                {
                                                                                    "code": [
                                                                                        "name"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "Paul",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:string"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "name": [
                                                                "Subject 0"
                                                            ]
                                                        }
                                                    ],
                                                    "role": [
                                                        "subject"
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    "strategy": [
                                        {
                                            "$": {
                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                "xsi:type": "humanStrategy"
                                            },
                                            "name": [
                                                "Treat"
                                            ],
                                            "rationale": [
                                                {
                                                    "axonicProject": [
                                                        {
                                                            "pathology": [
                                                                "OBESITY"
                                                            ],
                                                            "stimulator": [
                                                                "AXIS"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "actor": [
                                                {
                                                    "name": [
                                                        "Chloé"
                                                    ],
                                                    "role": [
                                                        "INTERMEDIATE_EXPERT"
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "conclusion": [
                                        {
                                            "element": [
                                                {
                                                    "$": {
                                                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                        "xsi:type": "establishedEffect"
                                                    },
                                                    "persistent": [
                                                        "true"
                                                    ],
                                                    "effects": [
                                                        {
                                                            "persistent": [
                                                                "true"
                                                            ]
                                                        }
                                                    ],
                                                    "experimentation": [
                                                        {
                                                            "persistent": [
                                                                "true"
                                                            ],
                                                            "stimulation": [
                                                                {
                                                                    "code": [
                                                                        "stimulation"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "stimulationScheduler": [
                                                                        {
                                                                            "code": [
                                                                                "scheduler"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "from": [
                                                                                {
                                                                                    "code": [
                                                                                        "from"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation.scheduler"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T10:36:55.694+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "to": [
                                                                                {
                                                                                    "code": [
                                                                                        "to"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation.scheduler"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T11:36:55.694+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "waveform": [
                                                                        {
                                                                            "code": [
                                                                                "waveform"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "RECTANGULAR",
                                                                                    "$": {
                                                                                        "xsi:type": "waveformEnum"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "range": [
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "RECTANGULAR",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "SINUS",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "RAMP",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "waveformParameter": [
                                                                        {
                                                                            "code": [
                                                                                "waveformParameters"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.stimulation"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "amplitude": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aContinuousNumber"
                                                                                    },
                                                                                    "code": [
                                                                                        "amplitude"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "1000.1",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "duration": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aContinuousNumber"
                                                                                    },
                                                                                    "code": [
                                                                                        "duration"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "300",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:int"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "frequency": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aContinuousNumber"
                                                                                    },
                                                                                    "code": [
                                                                                        "frequency"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "500.0",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "subject": [
                                                                {
                                                                    "code": [
                                                                        "subject"
                                                                    ],
                                                                    "path": [
                                                                        "fr.axonic"
                                                                    ],
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "dynamicInformations": [
                                                                        {
                                                                            "code": [
                                                                                "dynamic"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "bmi": [
                                                                                {
                                                                                    "code": [
                                                                                        "bmi"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.dynamic"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "40.0",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "weight": [
                                                                                {
                                                                                    "code": [
                                                                                        "weight"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.dynamic"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "130.0",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "id": [
                                                                        {
                                                                            "code": [
                                                                                "id"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "value": [
                                                                                {
                                                                                    "_": "12345",
                                                                                    "$": {
                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                        "xsi:type": "xs:string"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "pathologyInformations": [
                                                                        {
                                                                            "code": [
                                                                                "pathology"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "beginningOfObesity": [
                                                                                {
                                                                                    "code": [
                                                                                        "beginningObesity"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.pathology"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T10:36:55.712+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "obesityType": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aRangedEnum"
                                                                                    },
                                                                                    "code": [
                                                                                        "obesityType"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.pathology"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "GYNOID",
                                                                                            "$": {
                                                                                                "xsi:type": "obesityType"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "range": [
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "ANDROID",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "GYNOID",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "MIXED",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "staticInformations": [
                                                                        {
                                                                            "code": [
                                                                                "static"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic.subject"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "birthday": [
                                                                                {
                                                                                    "code": [
                                                                                        "birthday"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "2016-10-27T10:36:55.709+02:00",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:dateTime"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "gender": [
                                                                                {
                                                                                    "$": {
                                                                                        "xsi:type": "aRangedEnum"
                                                                                    },
                                                                                    "code": [
                                                                                        "gender"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "MALE",
                                                                                            "$": {
                                                                                                "xsi:type": "gender"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "range": [
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "MALE",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "FEMALE",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "UNKNOWN",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "height": [
                                                                                {
                                                                                    "code": [
                                                                                        "height"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "70.5",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:double"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "name": [
                                                                                {
                                                                                    "code": [
                                                                                        "name"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject.static"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "Paul",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:string"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "name": [
                                                "Establish Effect"
                                            ]
                                        }
                                    ],
                                    "evidences": [
                                        {
                                            "evidenceRoles": [
                                                {
                                                    "evidence": [
                                                        {
                                                            "$": {
                                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                                "xsi:type": "conclusion"
                                                            },
                                                            "element": [
                                                                {
                                                                    "$": {
                                                                        "xsi:type": "experimentation"
                                                                    },
                                                                    "persistent": [
                                                                        "true"
                                                                    ],
                                                                    "stimulation": [
                                                                        {
                                                                            "code": [
                                                                                "stimulation"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "stimulationScheduler": [
                                                                                {
                                                                                    "code": [
                                                                                        "scheduler"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "from": [
                                                                                        {
                                                                                            "code": [
                                                                                                "from"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation.scheduler"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T10:36:55.694+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "to": [
                                                                                        {
                                                                                            "code": [
                                                                                                "to"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation.scheduler"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T11:36:55.694+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "waveform": [
                                                                                {
                                                                                    "code": [
                                                                                        "waveform"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "RECTANGULAR",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "range": [
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "RECTANGULAR",
                                                                                                    "$": {
                                                                                                        "xsi:type": "waveformEnum"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "SINUS",
                                                                                                    "$": {
                                                                                                        "xsi:type": "waveformEnum"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "RAMP",
                                                                                                    "$": {
                                                                                                        "xsi:type": "waveformEnum"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "waveformParameter": [
                                                                                {
                                                                                    "code": [
                                                                                        "waveformParameters"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "amplitude": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aContinuousNumber"
                                                                                            },
                                                                                            "code": [
                                                                                                "amplitude"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "1000.1",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "duration": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aContinuousNumber"
                                                                                            },
                                                                                            "code": [
                                                                                                "duration"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "300",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:int"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "frequency": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aContinuousNumber"
                                                                                            },
                                                                                            "code": [
                                                                                                "frequency"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "500.0",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "subject": [
                                                                        {
                                                                            "code": [
                                                                                "subject"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "dynamicInformations": [
                                                                                {
                                                                                    "code": [
                                                                                        "dynamic"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "bmi": [
                                                                                        {
                                                                                            "code": [
                                                                                                "bmi"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.dynamic"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "40.0",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "weight": [
                                                                                        {
                                                                                            "code": [
                                                                                                "weight"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.dynamic"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "130.0",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "id": [
                                                                                {
                                                                                    "code": [
                                                                                        "id"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "12345",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:string"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "pathologyInformations": [
                                                                                {
                                                                                    "code": [
                                                                                        "pathology"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "beginningOfObesity": [
                                                                                        {
                                                                                            "code": [
                                                                                                "beginningObesity"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.pathology"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T10:36:55.712+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "obesityType": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aRangedEnum"
                                                                                            },
                                                                                            "code": [
                                                                                                "obesityType"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.pathology"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "GYNOID",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "range": [
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "ANDROID",
                                                                                                            "$": {
                                                                                                                "xsi:type": "obesityType"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "GYNOID",
                                                                                                            "$": {
                                                                                                                "xsi:type": "obesityType"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "MIXED",
                                                                                                            "$": {
                                                                                                                "xsi:type": "obesityType"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "staticInformations": [
                                                                                {
                                                                                    "code": [
                                                                                        "static"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "birthday": [
                                                                                        {
                                                                                            "code": [
                                                                                                "birthday"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T10:36:55.709+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "gender": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aRangedEnum"
                                                                                            },
                                                                                            "code": [
                                                                                                "gender"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "MALE",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "range": [
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "MALE",
                                                                                                            "$": {
                                                                                                                "xsi:type": "gender"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "FEMALE",
                                                                                                            "$": {
                                                                                                                "xsi:type": "gender"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "UNKNOWN",
                                                                                                            "$": {
                                                                                                                "xsi:type": "gender"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "height": [
                                                                                        {
                                                                                            "code": [
                                                                                                "height"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "70.5",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "name": [
                                                                                        {
                                                                                            "code": [
                                                                                                "name"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "Paul",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:string"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "name": [
                                                                "Experimentation"
                                                            ],
                                                            "limits": [
                                                                {
                                                                    "subject": [
                                                                        {
                                                                            "code": [
                                                                                "subject"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "dynamicInformations": [
                                                                                {
                                                                                    "code": [
                                                                                        "dynamic"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "bmi": [
                                                                                        {
                                                                                            "code": [
                                                                                                "bmi"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.dynamic"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "40.0",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "weight": [
                                                                                        {
                                                                                            "code": [
                                                                                                "weight"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.dynamic"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "130.0",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "id": [
                                                                                {
                                                                                    "code": [
                                                                                        "id"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "12345",
                                                                                            "$": {
                                                                                                "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                "xsi:type": "xs:string"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "pathologyInformations": [
                                                                                {
                                                                                    "code": [
                                                                                        "pathology"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "beginningOfObesity": [
                                                                                        {
                                                                                            "code": [
                                                                                                "beginningObesity"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.pathology"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T10:36:55.712+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "obesityType": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aRangedEnum"
                                                                                            },
                                                                                            "code": [
                                                                                                "obesityType"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.pathology"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "GYNOID",
                                                                                                    "$": {
                                                                                                        "xsi:type": "obesityType"
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "range": [
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "ANDROID",
                                                                                                            "$": {
                                                                                                                "xsi:type": "obesityType"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "GYNOID",
                                                                                                            "$": {
                                                                                                                "xsi:type": "obesityType"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "MIXED",
                                                                                                            "$": {
                                                                                                                "xsi:type": "obesityType"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "staticInformations": [
                                                                                {
                                                                                    "code": [
                                                                                        "static"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.subject"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "birthday": [
                                                                                        {
                                                                                            "code": [
                                                                                                "birthday"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T10:36:55.709+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "gender": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aRangedEnum"
                                                                                            },
                                                                                            "code": [
                                                                                                "gender"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "MALE",
                                                                                                    "$": {
                                                                                                        "xsi:type": "gender"
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "range": [
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "MALE",
                                                                                                            "$": {
                                                                                                                "xsi:type": "gender"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "FEMALE",
                                                                                                            "$": {
                                                                                                                "xsi:type": "gender"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "persistent": [
                                                                                                        "true"
                                                                                                    ],
                                                                                                    "value": [
                                                                                                        {
                                                                                                            "_": "UNKNOWN",
                                                                                                            "$": {
                                                                                                                "xsi:type": "gender"
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "height": [
                                                                                        {
                                                                                            "code": [
                                                                                                "height"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "70.5",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "name": [
                                                                                        {
                                                                                            "code": [
                                                                                                "name"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.subject.static"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "Paul",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:string"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "stimulation": [
                                                                        {
                                                                            "code": [
                                                                                "stimulation"
                                                                            ],
                                                                            "path": [
                                                                                "fr.axonic"
                                                                            ],
                                                                            "persistent": [
                                                                                "true"
                                                                            ],
                                                                            "stimulationScheduler": [
                                                                                {
                                                                                    "code": [
                                                                                        "scheduler"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "from": [
                                                                                        {
                                                                                            "code": [
                                                                                                "from"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation.scheduler"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T10:36:55.694+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "to": [
                                                                                        {
                                                                                            "code": [
                                                                                                "to"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation.scheduler"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "2016-10-27T11:36:55.694+02:00",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:dateTime"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "waveform": [
                                                                                {
                                                                                    "code": [
                                                                                        "waveform"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "value": [
                                                                                        {
                                                                                            "_": "RECTANGULAR",
                                                                                            "$": {
                                                                                                "xsi:type": "waveformEnum"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "range": [
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "RECTANGULAR",
                                                                                                    "$": {
                                                                                                        "xsi:type": "waveformEnum"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "SINUS",
                                                                                                    "$": {
                                                                                                        "xsi:type": "waveformEnum"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "RAMP",
                                                                                                    "$": {
                                                                                                        "xsi:type": "waveformEnum"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "waveformParameter": [
                                                                                {
                                                                                    "code": [
                                                                                        "waveformParameters"
                                                                                    ],
                                                                                    "path": [
                                                                                        "fr.axonic.stimulation"
                                                                                    ],
                                                                                    "persistent": [
                                                                                        "true"
                                                                                    ],
                                                                                    "amplitude": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aContinuousNumber"
                                                                                            },
                                                                                            "code": [
                                                                                                "amplitude"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "1000.1",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "duration": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aContinuousNumber"
                                                                                            },
                                                                                            "code": [
                                                                                                "duration"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "300",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:int"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "frequency": [
                                                                                        {
                                                                                            "$": {
                                                                                                "xsi:type": "aContinuousNumber"
                                                                                            },
                                                                                            "code": [
                                                                                                "frequency"
                                                                                            ],
                                                                                            "path": [
                                                                                                "fr.axonic.stimulation"
                                                                                            ],
                                                                                            "persistent": [
                                                                                                "true"
                                                                                            ],
                                                                                            "value": [
                                                                                                {
                                                                                                    "_": "500.0",
                                                                                                    "$": {
                                                                                                        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
                                                                                                        "xsi:type": "xs:double"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "role": [
                                                        ""
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    "strategy": [
                                        {
                                            "$": {
                                                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                                                "xsi:type": "humanStrategy"
                                            },
                                            "name": [
                                                "Establish Effect"
                                            ],
                                            "rationale": [
                                                {
                                                    "axonicProject": [
                                                        {
                                                            "pathology": [
                                                                "OBESITY"
                                                            ],
                                                            "stimulator": [
                                                                "AXIS"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "actor": [
                                                {
                                                    "name": [
                                                        "Chloé"
                                                    ],
                                                    "role": [
                                                        "INTERMEDIATE_EXPERT"
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }

            let parse;
            let listElements:  DiagramElement[];
            var nb : number;

            beforeEach(() => {
                parse  = new ImportDiagram.ParseJson2DiagramElements(jsonTest2Step);
                listElements = parse.getDiagramElements();
                nb = 0;
            });

            it("Return some elements", function () {
                expect(listElements.length).toBeGreaterThan(0);
            });

            it("Number of Conclusions", function () {
                for (let el of listElements) {
                    if (el instanceof Conclusion)
                    nb++;
                }
                expect(nb).toEqual(1);
            });

            it("Number of Strategies", function () {
                for (let el of listElements) {
                    if (el instanceof Strategy)
                        nb++;
                }
                expect(nb).toEqual(2);
            });

            it("Number of Evidences", function () {
                for (let el of listElements) {
                    if (el instanceof Evidence)
                        nb++;
                }
                expect(nb).toEqual(2);
            });

            it("Number of Supports (Evidence and Conclusion in the same time)", function () {
                for (let el of listElements) {
                    if (el instanceof Support)
                        nb++;
                }
                expect(nb).toEqual(1);
            });


            it('Each element have a property visualShape typed Cell (JointJS) witch have a parent property typed : DiagramElement (Business)', () => {
                let allElementOk = true;
                for (let el of listElements) {
                    if (!(el instanceof Artifact) && !(el instanceof LinkElement)) {
                        if (!(el.visualShape instanceof Cell))
                            allElementOk = false;
                        if (!((el.visualShape as any).parent instanceof DiagramElement))
                            allElementOk = false;
                    }
                }
                expect(allElementOk).toEqual(true);
            });
        });
    });
});