from model.dashboard.crud import show_dashboard

def open_dashboard():
    response = show_dashboard()

    return response