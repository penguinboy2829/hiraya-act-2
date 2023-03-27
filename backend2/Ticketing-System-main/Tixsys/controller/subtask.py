from model.subtask.crud import generate_subtask, cache_subtask, finish_subtask, edit_subtask

def create_subtask(**kwargs):
    response = generate_subtask(kwargs)

    return response

def archive_subtask(**kwargs):
    response = cache_subtask(kwargs)

    return response

def complete_subtask(**kwargs):
    response = finish_subtask(kwargs)

    return response

def modify_subtask(**kwargs):
    response = edit_subtask(kwargs)

    return response