from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = 'uploads/home_page.html'
