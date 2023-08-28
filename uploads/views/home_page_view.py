from django.views.generic import TemplateView, FormView
from uploads.forms import UploadForm
from django.shortcuts import render
from django.http import JsonResponse


def home_view(request):
    form = UploadForm(request.POST or None, request.FILES or None)
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "image uploaded successfully!"})

    context = {
        "form": form,
    }

    return render(request, template_name='uploads/home_page.html', context=context)


class HomePageView(FormView):
    template_name = 'uploads/home_page.html'
    form_class = UploadForm
    success_url = "/success/"

    def form_valid(self, form):
        # Save the form data and create an Upload instance
        form.save()
        return super().form_valid(form)
