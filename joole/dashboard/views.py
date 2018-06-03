from django.shortcuts import render, redirect
from django.views.generic import View

from .forms import ClientForm
from .models import Conso_eur, Conso_watt

YEAR_LENGTH = 12          # Redundant but avoids magical numbers
WINTER = [11, 0, 1, 2, 3] # December, January, February, and March
                          # Lenght used to determine length of winter
ADMISSABLE_IDS = [1, 100] #  Eventually should be replaced by an sql query checking
                          # table IDs lower and higher bounds assuming they are correctly
                          # modified on client creation / deletion.
HEATING_THRESHOLD = 4  # Representing 25% 
                       #  We will assume electrical heating if winter wattage average increase
                       # is at least 25% higher than the wattage average of the rest of the year.
                       # 25% chosen since winter does involve a general wattage increase due to
                       # things like less sunlight, or more time spent at home because its cold.
HEATING_MSGS = ["Unlikely", "Likely", "Highly likely"]
DYSFUNCTION_THRESHOLD = 10  # Representing 10%
                            #  We will assume wattage should more or less be the same year to year
                            # hence a 10% increase will be noted as an anomaly.
DYSFUNCTION_MSGS =  ["None", "Possible", "Detected"]    # Possible dysfunction check messages.
                                                        # 0 = Nothing detected
                                                        # 1 = Wattage change above threshold for 1 year
                                                        # 2 = Wattage change above threshold for both years
                                  
class ClientFormView(View):
    def get(self, request):
        return render(request, 'dashboard/accueil.html')

    def post(self, request):
        form = ClientForm(request.POST)        
        if form.is_valid():         
            errorMsg = "Unknown Error Occurred"
            client_id = form.cleaned_data['client']
            if client_id.isdigit(): # As defined only integers are accepted
                if ADMISSABLE_IDS[0] <= int(client_id) <= ADMISSABLE_IDS[1]: # Ok now redirect
                    return redirect('dashboard:results', client_id=client_id)
                else:
                    errorMsg = "Client ID submitted does not exist."
            else:
                errorMsg = "Client ID must be a number."
            return render(request, 'dashboard/accueil.html', {"error":errorMsg})

def results(request, client_id):
    euro_query = Conso_eur.objects.filter(client_id=client_id)
    watt_query = Conso_watt.objects.filter(client_id=client_id) 
    conso_euro = [monthFetcher(year) for year in euro_query]
    conso_watt = [monthFetcher(year) for year in watt_query]  
    annual_costs = yearTotals(conso_euro)
    annual_wattage = yearTotals(conso_watt)
    is_elec_heating = checkHeating(conso_watt)
    dysfunction_detected = checkDysfunction(annual_wattage)  

    context = {
        "conso_euro": conso_euro,
        "conso_watt": conso_watt,
        "annual_costs": annual_costs,
        "is_elec_heating": is_elec_heating,
        "dysfunction_detected": dysfunction_detected,
        "HEATING": HEATING_MSGS,
        "DYSFUNCTION": DYSFUNCTION_MSGS
    }
    return render(request, 'dashboard/results.html', context)

######### Check Functions ##########    
    
def checkDysfunction(annual_wattage):
    """ Helper function to check if possible dysfunction occurred. """  
    dysfunction_detected = 0
    anomalies = [False, False]
    year_diff = normalizeValue(annual_wattage[0] - annual_wattage[1])
    if year_diff > annual_wattage[0]/DYSFUNCTION_THRESHOLD:
        anomalies[0] = True
    if year_diff > annual_wattage[1]/DYSFUNCTION_THRESHOLD:
        anomalies[1] = True
    if all(anomalies):
        dysfunction_detected = 2
    elif any(anomalies):
        dysfunction_detected = 1
    # DEBUG
    #print("Year difference watt :", annual_wattage[0], "-", annual_wattage[1], "=", normalizeValue(annual_wattage[0] - annual_wattage[1]))
    #print("Dysfunction status :", DYSFUNCTION_MSGS[dysfunction_detected])
    return dysfunction_detected
    
def checkHeating(watt_year_list):
    """ Helper function to check if possible electrical heating. """
    is_elec_heating = 0
    each_year = [False for i in range(len(watt_year_list))]
    for i in range(len(watt_year_list)):
        months = watt_year_list[i]
        winter_average = sum([months[ind] for ind in WINTER]) / len(WINTER)
        rest_of_year_average = sum(months[WINTER[-1]+1:WINTER[0]]) / (YEAR_LENGTH - len(WINTER))
        # DEBUG
        #print("Winter average       :", winter_average)
        #print("Rest of year avergae :", rest_of_year_average)        
        if normalizeValue(winter_average - rest_of_year_average) >= (rest_of_year_average/HEATING_THRESHOLD):
            each_year[i] = True
    if all(each_year):
        is_elec_heating = 2
    elif any(each_year):
        is_elec_heating = 1
    # DEBUG
    #print("Electrical heating status :", HEATING_MSGS[is_elec_heating])
    return is_elec_heating
 
 
######### Helper Functions ##########
     
def yearTotals(conso_year_list):
    """ 
        Helper func to get year total.
        Can be used AS IS if more years are added.
    """
    return [sum(year) for year in conso_year_list]
    
def monthFetcher(conso_object):
    """ Fetch month data indepentent of actual model. """
    return [conso_object.janvier, conso_object.fevrier, conso_object.mars, 
            conso_object.avril, conso_object.mai, conso_object.juin,
            conso_object.juillet, conso_object.aout, conso_object.septembre,
            conso_object.octobre, conso_object.novembre, conso_object.decembre
            ] 
            
def normalizeValue(possibleNegative):
    """ 
        Turn positive in case a result is negative.
        Unexpected but could happen. 
    """
    return ((possibleNegative)**2)**(1/2)