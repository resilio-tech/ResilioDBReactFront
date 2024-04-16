# ResilioDB React Front
## Description
Here some code that will help you gathering data information around the impact for an existing model in RDB database.
The whole process is dynamic and evolves with the new models ResilioDB will have.\
⚠️ This is something to integrate to an already running React TS project ⚠️

## Disclaimers
- This feature is still under heavy development
- The code has been developed in a short amount of time
- The code is not optimized yet
- There may be some key errors in the console

## Dependencies
- fortawesome/fontawesome-svg-core: `^6.5.1`
- fortawesome/free-solid-svg-icons: `^6.5.1`
- fortawesome/react-fontawesome: `^0.2.0`
- Zod : `^3.22.4`
- Axios: `^1.6.8`
- Typescript: `^5.3.3`
- Sass: `^1.71.0`

## Installation
1. Clone the repository where you want it
2. Install the dependencies in your project
3. Change the color variable in the `styles.scss` file to git you theme
4. Update the token value in 'utils/requests.ts' to fit your [resilioDB token](https://db.resilio.tech/profile)
5. Create a `const [response, setResponse] = useState<any>(undefined);` useState
6. Call the component `<ResilioDBConfig setResponse={setResponse} />` in your project

## Usage
The useState passed will get set when the data is ready to be used.

The data object will look like this : 
<details><summary>
Data
</summary>
{
    "results": {
        "inventory{}": {
            "total": {
                "ADPe": 0.09654998779296875,
                "ADPf": 7192.39453125,
                "AP": 3.132380962371826,
                "CTUe": 12430.9150390625,
                "CTUh-c": 2.8836021215283836e-7,
                "CTUh-nc": 0.0000173474800249096,
                "Epf": 0.21273401379585266,
                "Epm": 0.5214988589286804,
                "Ept": 4.934785842895508,
                "GWP": 456.4972839355469,
                "GWPb": 0.7393435835838318,
                "GWPf": 455.6033630371094,
                "GWPlu": 0.01341155357658863,
                "IR": 418.3554382324219,
                "LU": 247.09140014648438,
                "ODP": 0.00005740541382692754,
                "PM": 0.000017977161405724473,
                "POCP": 1.4676481485366821,
                "WU": 107.73136138916016,
                "MIPS": 3368.097900390625,
                "TPE": 7390.30126953125
            },
            "per_lc_step": {
                "BLD": {
                    "ADPe": 0.09653040903920171,
                    "ADPf": 6330.2141366957885,
                    "AP": 2.7710663275966034,
                    "CTUe": 9532.513765618922,
                    "CTUh-c": 2.660116865948183e-7,
                    "CTUh-nc": 0.000016276631601721595,
                    "Epf": 0.21248912064399805,
                    "Epm": 0.3399001430254141,
                    "Ept": 3.7745739121161805,
                    "GWP": 395.18840130317886,
                    "GWPb": 0.3520975458207567,
                    "GWPf": 394.6803206603186,
                    "GWPlu": 0.013411553907797445,
                    "IR": 416.7471451003856,
                    "LU": 224.35001111107312,
                    "ODP": 0.0000562021633920149,
                    "PM": 0.000016112556430543298,
                    "POCP": 1.1729990660716965,
                    "WU": 107.30143465440969,
                    "MIPS": 3297.3289306161787,
                    "TPE": 6514.940756832223
                },
                "DIS": {
                    "ADPe": 0.0000019909506750699298,
                    "ADPf": 746.4731983605246,
                    "AP": 0.23065486044304961,
                    "CTUe": 62.1071743590288,
                    "CTUh-c": 1.1820797496699707e-9,
                    "CTUh-nc": 6.327246075570984e-8,
                    "Epf": 0.000017881910581813812,
                    "Epm": 0.09862965396419685,
                    "Ept": 1.078678377189264,
                    "GWP": 52.44384905535793,
                    "GWPb": 0,
                    "GWPf": 52.44384905535793,
                    "GWPlu": 0,
                    "IR": 0.933824151745505,
                    "LU": 0,
                    "ODP": 3.947625987921238e-7,
                    "PM": 0.0000014116347509749216,
                    "POCP": 0.26744279789677844,
                    "WU": 0.4299232729901046,
                    "MIPS": 26.50234991142638,
                    "TPE": 746.4979235766971
                },
                "USE": {
                    "ADPe": null,
                    "ADPf": null,
                    "AP": null,
                    "CTUe": null,
                    "CTUh-c": null,
                    "CTUh-nc": null,
                    "Epf": null,
                    "Epm": null,
                    "Ept": null,
                    "GWP": null,
                    "GWPb": null,
                    "GWPf": null,
                    "GWPlu": null,
                    "IR": null,
                    "LU": null,
                    "ODP": null,
                    "PM": null,
                    "POCP": null,
                    "WU": null,
                    "MIPS": null,
                    "TPE": null
                },
                "EOL": {
                    "ADPe": 0.00001758965572,
                    "ADPf": 115.70699200000001,
                    "AP": 0.1306598464,
                    "CTUe": 2836.294404,
                    "CTUh-c": 2.116643428e-8,
                    "CTUh-nc": 0.0000010075761759999999,
                    "Epf": 0.0002270066864,
                    "Epm": 0.0829690604,
                    "Ept": 0.08153371720000001,
                    "GWP": 8.865044999999999,
                    "GWPb": 0.3872460516,
                    "GWPf": 8.47919004,
                    "GWPlu": 0,
                    "IR": 0.6744633179999999,
                    "LU": 22.741393,
                    "ODP": 8.084889896e-7,
                    "PM": 4.529693644e-7,
                    "POCP": 0.02720624872,
                    "WU": 0,
                    "MIPS": 44.26672284,
                    "TPE": 128.8626408
                }
            },
            "normalized_per_lc_step": {
                "BLD": {
                    "ADPe": 3.0355474540629466,
                    "ADPf": 0.1953769795276478,
                    "AP": 0.01911080225928692,
                    "CTUe": 0.5017112508220485,
                    "CTUh-c": 0.001913753140969916,
                    "CTUh-nc": 0.027447945365466433,
                    "Epf": 0.028714746032972707,
                    "Epm": 0.011720694587083245,
                    "Ept": 0.004255438457853642,
                    "GWP": 0.4012064987849532,
                    "IR": 0.0054691226391126715,
                    "LU": 0.12192935386471365,
                    "ODP": 0.0007205405563078833,
                    "PM": 0.21569687323351136,
                    "POCP": 0.019948963708702323,
                    "WU": 0.004079902458342574
                },
                "DIS": {
                    "ADPe": 0.00006260851179465187,
                    "ADPf": 0.023039296245695205,
                    "AP": 0.0015907231754693078,
                    "CTUe": 0.0032687986504752,
                    "CTUh-c": 0.000008504170860935042,
                    "CTUh-nc": 0.0001066989220163741,
                    "Epf": 0.0000024164744029478123,
                    "Epm": 0.0034010225504895464,
                    "Ept": 0.0012160973812731274,
                    "GWP": 0.05324248635061719,
                    "IR": 0.000012254910127893766,
                    "LU": 0,
                    "ODP": 0.000005061058958873382,
                    "PM": 0.018897386224563877,
                    "POCP": 0.004548346903006436,
                    "WU": 0.00001634689250912945
                },
                "USE": {
                    "ADPe": null,
                    "ADPf": null,
                    "AP": null,
                    "CTUe": null,
                    "CTUh-c": null,
                    "CTUh-nc": null,
                    "Epf": null,
                    "Epm": null,
                    "Ept": null,
                    "GWP": null,
                    "GWPb": null,
                    "GWPf": null,
                    "GWPlu": null,
                    "IR": null,
                    "LU": null,
                    "ODP": null,
                    "PM": null,
                    "POCP": null,
                    "WU": null,
                    "MIPS": null,
                    "TPE": null
                },
                "EOL": {
                    "ADPe": 0.0005531338276729559,
                    "ADPf": 0.0035712034567901237,
                    "AP": 0.0009011023889655172,
                    "CTUe": 0.14927865284210529,
                    "CTUh-c": 0.0001522765056115108,
                    "CTUh-nc": 0.0016991166543001684,
                    "Epf": 0.000030676579243243244,
                    "Epm": 0.0028610020827586208,
                    "Ept": 0.00009192076347237881,
                    "GWP": 0.009000045685279186,
                    "IR": 0.00000885122464566929,
                    "LU": 0.012359452717391304,
                    "ODP": 0.000010365243456410256,
                    "PM": 0.0060638469129852745,
                    "POCP": 0.0004626913047619048,
                    "WU": 0
                }
            }
        },
        "asdasd": {
            "total": {
                "ADPe": 0.09654998964559677,
                "ADPf": 7192.394327056313,
                "AP": 3.132381034439653,
                "CTUe": 12430.915343977951,
                "CTUh-c": 2.883602006244883e-7,
                "CTUh-nc": 0.000017347480238477303,
                "Epf": 0.21273400924097988,
                "Epm": 0.5214988573896109,
                "Ept": 4.934786006505444,
                "GWP": 456.4972953585368,
                "GWPb": 0.7393435974207567,
                "GWPf": 455.60335975567654,
                "GWPlu": 0.013411553907797445,
                "IR": 418.3554325701311,
                "LU": 247.0914041110731,
                "ODP": 0.00005740541498040702,
                "PM": 0.00001797716054591822,
                "POCP": 1.4676481126884748,
                "WU": 107.7313579273998,
                "MIPS": 3368.098003367605,
                "TPE": 7390.30132120892
            },
            "per_lc_step": {
                "BLD": {
                    "ADPe": 0.09653040903920171,
                    "ADPf": 6330.2141366957885,
                    "AP": 2.7710663275966034,
                    "CTUe": 9532.513765618922,
                    "CTUh-c": 2.660116865948183e-7,
                    "CTUh-nc": 0.000016276631601721595,
                    "Epf": 0.21248912064399805,
                    "Epm": 0.3399001430254141,
                    "Ept": 3.7745739121161805,
                    "GWP": 395.18840130317886,
                    "GWPb": 0.3520975458207567,
                    "GWPf": 394.6803206603186,
                    "GWPlu": 0.013411553907797445,
                    "IR": 416.7471451003856,
                    "LU": 224.35001111107312,
                    "ODP": 0.0000562021633920149,
                    "PM": 0.000016112556430543298,
                    "POCP": 1.1729990660716965,
                    "WU": 107.30143465440969,
                    "MIPS": 3297.3289306161787,
                    "TPE": 6514.940756832223
                },
                "DIS": {
                    "ADPe": 0.0000019909506750699298,
                    "ADPf": 746.4731983605246,
                    "AP": 0.23065486044304961,
                    "CTUe": 62.1071743590288,
                    "CTUh-c": 1.1820797496699707e-9,
                    "CTUh-nc": 6.327246075570984e-8,
                    "Epf": 0.000017881910581813812,
                    "Epm": 0.09862965396419685,
                    "Ept": 1.078678377189264,
                    "GWP": 52.44384905535793,
                    "GWPb": 0,
                    "GWPf": 52.44384905535793,
                    "GWPlu": 0,
                    "IR": 0.933824151745505,
                    "LU": 0,
                    "ODP": 3.947625987921238e-7,
                    "PM": 0.0000014116347509749216,
                    "POCP": 0.26744279789677844,
                    "WU": 0.4299232729901046,
                    "MIPS": 26.50234991142638,
                    "TPE": 746.4979235766971
                },
                "USE": {
                    "ADPe": null,
                    "ADPf": null,
                    "AP": null,
                    "CTUe": null,
                    "CTUh-c": null,
                    "CTUh-nc": null,
                    "Epf": null,
                    "Epm": null,
                    "Ept": null,
                    "GWP": null,
                    "GWPb": null,
                    "GWPf": null,
                    "GWPlu": null,
                    "IR": null,
                    "LU": null,
                    "ODP": null,
                    "PM": null,
                    "POCP": null,
                    "WU": null,
                    "MIPS": null,
                    "TPE": null
                },
                "EOL": {
                    "ADPe": 0.00001758965572,
                    "ADPf": 115.70699200000001,
                    "AP": 0.1306598464,
                    "CTUe": 2836.294404,
                    "CTUh-c": 2.116643428e-8,
                    "CTUh-nc": 0.0000010075761759999999,
                    "Epf": 0.0002270066864,
                    "Epm": 0.0829690604,
                    "Ept": 0.08153371720000001,
                    "GWP": 8.865044999999999,
                    "GWPb": 0.3872460516,
                    "GWPf": 8.47919004,
                    "GWPlu": 0,
                    "IR": 0.6744633179999999,
                    "LU": 22.741393,
                    "ODP": 8.084889896e-7,
                    "PM": 4.529693644e-7,
                    "POCP": 0.02720624872,
                    "WU": 0,
                    "MIPS": 44.26672284,
                    "TPE": 128.8626408
                }
            },
            "normalized_per_lc_step": {
                "BLD": {
                    "ADPe": 3.0355474540629466,
                    "ADPf": 0.1953769795276478,
                    "AP": 0.01911080225928692,
                    "CTUe": 0.5017112508220485,
                    "CTUh-c": 0.001913753140969916,
                    "CTUh-nc": 0.027447945365466433,
                    "Epf": 0.028714746032972707,
                    "Epm": 0.011720694587083245,
                    "Ept": 0.004255438457853642,
                    "GWP": 0.4012064987849532,
                    "IR": 0.0054691226391126715,
                    "LU": 0.12192935386471365,
                    "ODP": 0.0007205405563078833,
                    "PM": 0.21569687323351136,
                    "POCP": 0.019948963708702323,
                    "WU": 0.004079902458342574
                },
                "DIS": {
                    "ADPe": 0.00006260851179465187,
                    "ADPf": 0.023039296245695205,
                    "AP": 0.0015907231754693078,
                    "CTUe": 0.0032687986504752,
                    "CTUh-c": 0.000008504170860935042,
                    "CTUh-nc": 0.0001066989220163741,
                    "Epf": 0.0000024164744029478123,
                    "Epm": 0.0034010225504895464,
                    "Ept": 0.0012160973812731274,
                    "GWP": 0.05324248635061719,
                    "IR": 0.000012254910127893766,
                    "LU": 0,
                    "ODP": 0.000005061058958873382,
                    "PM": 0.018897386224563877,
                    "POCP": 0.004548346903006436,
                    "WU": 0.00001634689250912945
                },
                "USE": {
                    "ADPe": null,
                    "ADPf": null,
                    "AP": null,
                    "CTUe": null,
                    "CTUh-c": null,
                    "CTUh-nc": null,
                    "Epf": null,
                    "Epm": null,
                    "Ept": null,
                    "GWP": null,
                    "GWPb": null,
                    "GWPf": null,
                    "GWPlu": null,
                    "IR": null,
                    "LU": null,
                    "ODP": null,
                    "PM": null,
                    "POCP": null,
                    "WU": null,
                    "MIPS": null,
                    "TPE": null
                },
                "EOL": {
                    "ADPe": 0.0005531338276729559,
                    "ADPf": 0.0035712034567901237,
                    "AP": 0.0009011023889655172,
                    "CTUe": 0.14927865284210529,
                    "CTUh-c": 0.0001522765056115108,
                    "CTUh-nc": 0.0016991166543001684,
                    "Epf": 0.000030676579243243244,
                    "Epm": 0.0028610020827586208,
                    "Ept": 0.00009192076347237881,
                    "GWP": 0.009000045685279186,
                    "IR": 0.00000885122464566929,
                    "LU": 0.012359452717391304,
                    "ODP": 0.000010365243456410256,
                    "PM": 0.0060638469129852745,
                    "POCP": 0.0004626913047619048,
                    "WU": 0
                }
            },
            "per_component": {
                "CPU{'params': CPUConfig(litho_nm=130, die_surface_mm2=101, configuration_name='AMD Sempron 2800+', request_name='AMD Sempron 2800+')}": {
                    "total": {
                        "ADPe": 0.03672341709585606,
                        "ADPf": 198.75826588229424,
                        "AP": 0.25908014653831457,
                        "CTUe": 3667.8091854623917,
                        "CTUh-c": 8.185589016689997e-8,
                        "CTUh-nc": 0.000008465813337259773,
                        "Epf": 0.21178805510242296,
                        "Epm": 0.07436225570952588,
                        "Ept": 0.9470650463245528,
                        "GWP": 15.651524983178373,
                        "GWPb": 0.035750210944964694,
                        "GWPf": 15.60280239791213,
                        "GWPlu": 0.013411289125097444,
                        "IR": 0.7953127534222161,
                        "LU": 224.13647498330317,
                        "ODP": 5.36346576530245e-7,
                        "PM": 0.000002305925592447474,
                        "POCP": 0.21009312079812292,
                        "WU": 4.5517192879326105,
                        "MIPS": 1.4049070157480001,
                        "TPE": 229.269593433371
                    },
                    "per_lc_step": {
                        "BLD": {
                            "ADPe": 0.03672341709585606,
                            "ADPf": 198.75826588229424,
                            "AP": 0.25908014653831457,
                            "CTUe": 3667.8091854623917,
                            "CTUh-c": 8.185589016689997e-8,
                            "CTUh-nc": 0.000008465813337259773,
                            "Epf": 0.21178805510242296,
                            "Epm": 0.07436225570952588,
                            "Ept": 0.9470650463245528,
                            "GWP": 15.651524983178373,
                            "GWPb": 0.035750210944964694,
                            "GWPf": 15.60280239791213,
                            "GWPlu": 0.013411289125097444,
                            "IR": 0.7953127534222161,
                            "LU": 224.13647498330317,
                            "ODP": 5.36346576530245e-7,
                            "PM": 0.000002305925592447474,
                            "POCP": 0.21009312079812292,
                            "WU": 4.5517192879326105,
                            "MIPS": 1.4049070157480001,
                            "TPE": 229.269593433371
                        },
                        "EOL": {
                            "ADPe": 0,
                            "ADPf": 0,
                            "AP": 0,
                            "CTUe": 0,
                            "CTUh-c": 0,
                            "CTUh-nc": 0,
                            "Epf": 0,
                            "Epm": 0,
                            "Ept": 0,
                            "GWP": 0,
                            "GWPb": 0,
                            "GWPf": 0,
                            "GWPlu": 0,
                            "IR": 0,
                            "LU": 0,
                            "ODP": 0,
                            "PM": 0,
                            "POCP": 0,
                            "WU": 0,
                            "MIPS": 0,
                            "TPE": 0
                        }
                    },
                    "normalized_per_lc_step": {
                        "BLD": {
                            "ADPe": 1.1548244369766056,
                            "ADPf": 0.006134514379083155,
                            "AP": 0.0017867596312987212,
                            "CTUe": 0.19304258870854693,
                            "CTUh-c": 0.000588891296164748,
                            "CTUh-nc": 0.01427624508812778,
                            "Epf": 0.028620007446273372,
                            "Epm": 0.002564215714121582,
                            "Ept": 0.0010677170759014125,
                            "GWP": 0.015889873079368906,
                            "IR": 0.000010437175241761366,
                            "LU": 0.12181330162136042,
                            "ODP": 0.000006876238160644167,
                            "PM": 0.030869151170648913,
                            "POCP": 0.0035730122584714786,
                            "WU": 0.00017306917444610687
                        },
                        "EOL": {
                            "ADPe": 0,
                            "ADPf": 0,
                            "AP": 0,
                            "CTUe": 0,
                            "CTUh-c": 0,
                            "CTUh-nc": 0,
                            "Epf": 0,
                            "Epm": 0,
                            "Ept": 0,
                            "GWP": 0,
                            "IR": 0,
                            "LU": 0,
                            "ODP": 0,
                            "PM": 0,
                            "POCP": 0,
                            "WU": 0
                        }
                    }
                },
                "RAM{'params': RAMConfig(size_gb=12, configuration_name=None, request_name=None)}": {
                    "total": {
                        "ADPe": 0.00011831311906564403,
                        "ADPf": 357.6188628134942,
                        "AP": 0.15187642745828872,
                        "CTUe": 355.5829841565298,
                        "CTUh-c": 2.854310707918366e-9,
                        "CTUh-nc": 1.6045044046182065e-7,
                        "Epf": 0.00008380262797508317,
                        "Epm": 0.0184501477158882,
                        "Ept": 0.19077378299162767,
                        "GWP": 27.406321320000497,
                        "GWPb": 0.018502986475792,
                        "GWPf": 27.3009483024065,
                        "GWPlu": 5.187e-10,
                        "IR": 1.0330236649634323,
                        "LU": 0.13516272776993998,
                        "ODP": 0.000011660043405084655,
                        "PM": 8.362866024958244e-7,
                        "POCP": 0.05986451399357332,
                        "WU": 12.257715366477067,
                        "MIPS": 63.76978644043083,
                        "TPE": 365.20660419885223
                    },
                    "per_lc_step": {
                        "BLD": {
                            "ADPe": 0.00011831194334564403,
                            "ADPf": 357.5358708134942,
                            "AP": 0.15166618105828872,
                            "CTUe": 350.2645801565298,
                            "CTUh-c": 2.838196427918366e-9,
                            "CTUh-nc": 1.5881826446182064e-7,
                            "Epf": 0.00008366154157508317,
                            "Epm": 0.0182986873158882,
                            "Ept": 0.19069286579162767,
                            "GWP": 27.397676320000496,
                            "GWPb": 0.018087334875791998,
                            "GWPf": 27.2927182624065,
                            "GWPlu": 5.187e-10,
                            "IR": 1.0324323469634324,
                            "LU": 0.10576972776993998,
                            "ODP": 0.000011659416815484656,
                            "PM": 8.358308380958245e-7,
                            "POCP": 0.05983394527357332,
                            "WU": 12.257715366477067,
                            "MIPS": 63.75602360043083,
                            "TPE": 365.1111633988522
                        },
                        "EOL": {
                            "ADPe": 1.17572e-9,
                            "ADPf": 0.082992,
                            "AP": 0.0002102464,
                            "CTUe": 5.318404,
                            "CTUh-c": 1.611428e-11,
                            "CTUh-nc": 1.632176e-9,
                            "Epf": 1.410864e-7,
                            "Epm": 0.0001514604,
                            "Ept": 0.00008091720000000001,
                            "GWP": 0.008645,
                            "GWPb": 0.0004156516,
                            "GWPf": 0.008230040000000001,
                            "GWPlu": 0,
                            "IR": 0.000591318,
                            "LU": 0.029393,
                            "ODP": 6.265896e-10,
                            "PM": 4.557644e-10,
                            "POCP": 0.000030568720000000006,
                            "WU": 0,
                            "MIPS": 0.013762839999999998,
                            "TPE": 0.0954408
                        }
                    },
                    "normalized_per_lc_step": {
                        "BLD": {
                            "ADPe": 0.003720501363070567,
                            "ADPf": 0.011035057741157228,
                            "AP": 0.0010459736624709567,
                            "CTUe": 0.018434977902975252,
                            "CTUh-c": 0.000020418679337542203,
                            "CTUh-nc": 0.0002678216938647903,
                            "Epf": 0.00001130561372636259,
                            "Epm": 0.0006309892177892482,
                            "Ept": 0.00021498631994546524,
                            "GWP": 0.027814899817259386,
                            "IR": 0.000013548980931278641,
                            "LU": 0.000057483547701054335,
                            "ODP": 0.00014947970276262378,
                            "PM": 0.011189167845994974,
                            "POCP": 0.0010175841032920635,
                            "WU": 0.00046607282762270213
                        },
                        "EOL": {
                            "ADPe": 3.6972327044025156e-8,
                            "ADPf": 0.0000025614814814814815,
                            "AP": 0.0000014499751724137932,
                            "CTUe": 0.000279916,
                            "CTUh-c": 1.1593007194244605e-7,
                            "CTUh-nc": 0.0000027524047217537943,
                            "Epf": 1.9065729729729727e-8,
                            "Epm": 0.000005222772413793103,
                            "Ept": 9.122570462232245e-8,
                            "GWP": 0.000008776649746192893,
                            "IR": 7.76007874015748e-9,
                            "LU": 0.00001597445652173913,
                            "ODP": 8.033199999999999e-9,
                            "PM": 0.000006101263721552878,
                            "POCP": 5.198761904761906e-7,
                            "WU": 0
                        }
                    }
                }
            }
        },
        "configuration": {
            "asdasd": {
                "id": 7424440,
                "config": {
                    "cpus": [
                        {
                            "litho_nm": 130,
                            "die_surface_mm2": 101,
                            "configuration_name": "AMD Sempron 2800+",
                            "request_name": "AMD Sempron 2800+"
                        }
                    ],
                    "rams": [
                        {
                            "size_gb": 12,
                            "configuration_name": null,
                            "request_name": null
                        }
                    ],
                    "usage_percent": 1,
                    "server_type": "blade",
                    "dedicated_graphics_cards": null,
                    "ssd_disks": null,
                    "hdd_disks": null,
                    "configuration_score": 3.1818181818181817,
                    "wanted_name": "asdasd",
                    "configuration_name": "Custom Server",
                    "request_name": null,
                    "usage": {
                        "yearly_electricity_consumption": 8032.92,
                        "power_watt": null,
                        "geography": null,
                        "delta_t_hour": null
                    }
                },
                "usage": {
                    "yearly_electricity_consumption": 8032.92,
                    "power_watt": null,
                    "geography": null,
                    "delta_t_hour": null
                },
                "scores": {
                    "data_source_quality": 3,
                    "environmental_assessment_quality": 4,
                    "configuration_score": 3.1818181818181817
                },
                "type": "server"
            }
        }
    },
    "metadata": {
        "time": "2024-04-16 13:44:39.255057"
    },
    "hash": "YOUR HASH",
    "version": "latest"
}
</details>

The errors are set internally in the class and are using ZodErrors to validate the input data. The errors are not returned in the response.

## Token and requests
All the requests used are listed in the requests folder.
The requests are using a `requests.ts` file that holds the headers needed (token included) and the base url.

⚠️ TOKEN IS EXPOSED IN YOUR FRONTEND IF YOU DO NOT REROUTE THE REQUESTS TO YOUR BACKEND ⚠️

You are free to reroute the requests to your backend to not expose your token and fire the requests from there.

## How does it work ?
The system is classbased on the endpoint `/models` of resilioDB. It means that resilioDB will return a list of models that are available for the user.\
A new object will then get created to fit the needs to our TS/React env, and passed as parameters to a class that will recursively
go through the object and create it's associated react.element while keeping an array of the created elements to access them.

## Last words
Feel free to open an issue if you have any question or need help with the code.

Thank you 🚀