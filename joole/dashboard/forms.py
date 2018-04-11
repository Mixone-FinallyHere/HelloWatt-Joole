from django import forms

class ClientForm(forms.Form):
    client = forms.CharField(
        label='Tapez votre numero de client', max_length=200
    )