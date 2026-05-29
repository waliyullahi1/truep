const schoolsByState = [
    {
        state: "Abia",
        schools: [
            {
                name: "Michael Okpara University of Agriculture Umudike",
                abbreviation: "MOUAU",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Abia State University",
                abbreviation: "ABSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Abia State Polytechnic",
                abbreviation: "ABIAPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Adamawa",
        schools: [
            {
                name: "Modibbo Adama University",
                abbreviation: "MAU",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Adamawa State University",
                abbreviation: "ADSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Mubi",
                abbreviation: "FPM",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Akwa Ibom",
        schools: [
            {
                name: "University of Uyo",
                abbreviation: "UNIUYO",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Akwa Ibom State University",
                abbreviation: "AKSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Akwa Ibom State Polytechnic",
                abbreviation: "AKWAPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Anambra",
        schools: [
            {
                name: "Nnamdi Azikiwe University",
                abbreviation: "UNIZIK",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Chukwuemeka Odumegwu Ojukwu University",
                abbreviation: "COOU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Oko",
                abbreviation: "OKOPOLY",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Bauchi",
        schools: [
            {
                name: "Abubakar Tafawa Balewa University",
                abbreviation: "ATBU",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Bauchi State University",
                abbreviation: "BASUG",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Bauchi",
                abbreviation: "FPTB",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Bayelsa",
        schools: [
            {
                name: "Federal University Otuoke",
                abbreviation: "FUO",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Niger Delta University",
                abbreviation: "NDU",
                type: "university",
                ownership: "state"
            }
        ]
    },

    {
        state: "Benue",
        schools: [
            {
                name: "Federal University of Health Sciences Otukpo",
                abbreviation: "FUHSO",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Benue State University",
                abbreviation: "BSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Wannune",
                abbreviation: "FPW",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Borno",
        schools: [
            {
                name: "University of Maiduguri",
                abbreviation: "UNIMAID",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Borno State University",
                abbreviation: "BOSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Ramat Polytechnic",
                abbreviation: "RAMATPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Cross River",
        schools: [
            {
                name: "University of Calabar",
                abbreviation: "UNICAL",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Cross River University of Technology",
                abbreviation: "CRUTECH",
                type: "university",
                ownership: "state"
            }
        ]
    },

    {
        state: "Delta",
        schools: [
            {
                name: "Federal University of Petroleum Resources Effurun",
                abbreviation: "FUPRE",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Delta State University",
                abbreviation: "DELSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Delta State Polytechnic Ogwashi-Uku",
                abbreviation: "DSPG",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Ebonyi",
        schools: [
            {
                name: "Alex Ekwueme Federal University Ndufu-Alike",
                abbreviation: "AEFUNAI",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Ebonyi State University",
                abbreviation: "EBSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Akanu Ibiam Federal Polytechnic",
                abbreviation: "AIFPU",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Edo",
        schools: [
            {
                name: "University of Benin",
                abbreviation: "UNIBEN",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Ambrose Alli University",
                abbreviation: "AAU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Auchi Polytechnic",
                abbreviation: "AUCHIPOLY",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Ekiti",
        schools: [
            {
                name: "Federal University Oye-Ekiti",
                abbreviation: "FUOYE",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Ekiti State University",
                abbreviation: "EKSU",
                type: "university",
                ownership: "state"
            }
        ]
    },

    {
        state: "Enugu",
        schools: [
            {
                name: "University of Nigeria Nsukka",
                abbreviation: "UNN",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Enugu State University of Science and Technology",
                abbreviation: "ESUT",
                type: "university",
                ownership: "state"
            },
            {
                name: "Institute of Management and Technology",
                abbreviation: "IMT",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "FCT Abuja",
        schools: [
            {
                name: "University of Abuja",
                abbreviation: "UNIABUJA",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Abraham Adesanya Polytechnic",
                abbreviation: "AAPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Gombe",
        schools: [
            {
                name: "Federal University Kashere",
                abbreviation: "FUK",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Gombe State University",
                abbreviation: "GSU",
                type: "university",
                ownership: "state"
            }
        ]
    },

    {
        state: "Imo",
        schools: [
            {
                name: "Federal University of Technology Owerri",
                abbreviation: "FUTO",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Imo State University",
                abbreviation: "IMSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Imo State Polytechnic",
                abbreviation: "IMOPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },
    {
        state: "Imo",
        schools: [
            {
                name: "Federal University of Technology Owerri",
                abbreviation: "FUTO",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Imo State University",
                abbreviation: "IMSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Imo State Polytechnic",
                abbreviation: "IMOPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Jigawa",
        schools: [
            {
                name: "Federal University Dutse",
                abbreviation: "FUD",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Sule Lamido University",
                abbreviation: "SLU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Dutse",
                abbreviation: "FPD",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Kaduna",
        schools: [
            {
                name: "Ahmadu Bello University",
                abbreviation: "ABU",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Kaduna State University",
                abbreviation: "KASU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Kaduna Polytechnic",
                abbreviation: "KADPOLY",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Kano",
        schools: [
            {
                name: "Bayero University Kano",
                abbreviation: "BUK",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Kano University of Science and Technology",
                abbreviation: "KUST",
                type: "university",
                ownership: "state"
            },
            {
                name: "Kano State Polytechnic",
                abbreviation: "KANOPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Katsina",
        schools: [
            {
                name: "Federal University Dutsin-Ma",
                abbreviation: "FUDMA",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Umaru Musa Yar’adua University",
                abbreviation: "UMYU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Hassan Usman Katsina Polytechnic",
                abbreviation: "HUKPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Kebbi",
        schools: [
            {
                name: "Federal University Birnin Kebbi",
                abbreviation: "FUBK",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Kebbi State University of Science and Technology",
                abbreviation: "KSUSTA",
                type: "university",
                ownership: "state"
            },
            {
                name: "Waziri Umaru Federal Polytechnic",
                abbreviation: "WUFPBK",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Kogi",
        schools: [
            {
                name: "Federal University Lokoja",
                abbreviation: "FUL",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Kogi State University",
                abbreviation: "KSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Idah",
                abbreviation: "FPI",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Kwara",
        schools: [
            {
                name: "University of Ilorin",
                abbreviation: "UNILORIN",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Kwara State University",
                abbreviation: "KWASU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Offa",
                abbreviation: "OFFAPOLY",
                type: "polytechnic",
                ownership: "federal"
            },
            {
                name: "Kwara State Polytechnic",
                abbreviation: "KWARAPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Lagos",
        schools: [
            {
                name: "University of Lagos",
                abbreviation: "UNILAG",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Lagos State University",
                abbreviation: "LASU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Yaba College of Technology",
                abbreviation: "YABATECH",
                type: "polytechnic",
                ownership: "federal"
            },
            {
                name: "Lagos State Polytechnic",
                abbreviation: "LASPOTECH",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Nasarawa",
        schools: [
            {
                name: "Federal University Lafia",
                abbreviation: "FULAFIA",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Nasarawa State University",
                abbreviation: "NSUK",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Nasarawa",
                abbreviation: "FPN",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Niger",
        schools: [
            {
                name: "Federal University of Technology Minna",
                abbreviation: "FUTMINNA",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Ibrahim Badamasi Babangida University",
                abbreviation: "IBBU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Bida",
                abbreviation: "BIDAPOLY",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Ogun",
        schools: [
            {
                name: "Federal University of Agriculture Abeokuta",
                abbreviation: "FUNAAB",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Olabisi Onabanjo University",
                abbreviation: "OOU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Ilaro",
                abbreviation: "ILAROPOLY",
                type: "polytechnic",
                ownership: "federal"
            },
            {
                name: "Moshood Abiola Polytechnic",
                abbreviation: "MAPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Ondo",
        schools: [
            {
                name: "Federal University of Technology Akure",
                abbreviation: "FUTA",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Ondo State University of Science and Technology",
                abbreviation: "OAUSTECH",
                type: "university",
                ownership: "state"
            },
            {
                name: "Rufus Giwa Polytechnic",
                abbreviation: "RUGIPO",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Osun",
        schools: [
            {
                name: "Obafemi Awolowo University",
                abbreviation: "OAU",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Osun State University",
                abbreviation: "UNIOSUN",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Ede",
                abbreviation: "EDEPOLY",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Oyo",
        schools: [
            {
                name: "University of Ibadan",
                abbreviation: "UI",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Ladoke Akintola University of Technology",
                abbreviation: "LAUTECH",
                type: "university",
                ownership: "state"
            },
            {
                name: "The Polytechnic Ibadan",
                abbreviation: "POLYIBADAN",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Plateau",
        schools: [
            {
                name: "University of Jos",
                abbreviation: "UNIJOS",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Plateau State University",
                abbreviation: "PLASU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Plateau State Polytechnic",
                abbreviation: "PLAPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Rivers",
        schools: [
            {
                name: "University of Port Harcourt",
                abbreviation: "UNIPORT",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Rivers State University",
                abbreviation: "RSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Kenule Beeson Saro-Wiwa Polytechnic",
                abbreviation: "KENPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Sokoto",
        schools: [
            {
                name: "Usmanu Danfodiyo University",
                abbreviation: "UDUS",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Sokoto State University",
                abbreviation: "SSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Umaru Ali Shinkafi Polytechnic",
                abbreviation: "SOSPOLY",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    },

    {
        state: "Taraba",
        schools: [
            {
                name: "Federal University Wukari",
                abbreviation: "FUWUKARI",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Taraba State University",
                abbreviation: "TSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Bali",
                abbreviation: "FPB",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Yobe",
        schools: [
            {
                name: "Federal University Gashua",
                abbreviation: "FUGASHUA",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Yobe State University",
                abbreviation: "YSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Federal Polytechnic Damaturu",
                abbreviation: "FPD",
                type: "polytechnic",
                ownership: "federal"
            }
        ]
    },

    {
        state: "Zamfara",
        schools: [
            {
                name: "Federal University Gusau",
                abbreviation: "FUGUS",
                type: "university",
                ownership: "federal"
            },
            {
                name: "Zamfara State University",
                abbreviation: "ZSU",
                type: "university",
                ownership: "state"
            },
            {
                name: "Abdu Gusau Polytechnic",
                abbreviation: "AGP",
                type: "polytechnic",
                ownership: "state"
            }
        ]
    }



    // Remaining states continue with same structure...
]

export default schoolsByState