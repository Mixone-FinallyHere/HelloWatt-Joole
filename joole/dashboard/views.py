from django.shortcuts import render, redirect
from django.views.generic import View

from .forms import ClientForm
from .models import Conso_eur, Conso_watt


ADMISSABLE_IDS = [0, 100] #  Eventually should be replaced by an sql query checking
                          # table IDs lower and higher bounds assuming they are correctly
                          # modified on client creation / deletion.

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
    
    conso_euro = Conso_eur.objects.filter(client_id=client_id)
    conso_watt = Conso_watt.objects.filter(client_id=client_id)
    annual_costs = yearTotals(conso_euro)
    is_elec_heating = True
    dysfunction_detected = False     
        
    print(annual_costs)
    
    context = {
        "conso_euro": conso_euro,
        "conso_watt": conso_watt,
        "annual_costs": annual_costs,
        "is_elec_heating": is_elec_heating,
        "dysfunction_detected": dysfunction_detected
    }
    return render(request, 'dashboard/results.html', context)
    
def yearTotals(consumptionObjectList):
    return [sum(monthFetcher(consumptionObjectList[0])), sum(monthFetcher(consumptionObjectList[1]))]
    
def monthFetcher(consoObject):
    return [consoObject.janvier, consoObject.fevrier, consoObject.mars, 
            consoObject.avril, consoObject.mai, consoObject.juin,
            consoObject.juillet, consoObject.aout, consoObject.septembre,
            consoObject.octobre, consoObject.novembre, consoObject.decembre
            ]