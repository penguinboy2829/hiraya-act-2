from flask import request
from model.init_db import db
from werkzeug.security import generate_password_hash

class Controller():
    def __init__(self):
        self.required_data_list = {"bp.login_user":("email", "username", "password"),
                                   "bp.register_user":("email", "username", "password", "first_name", "last_name"),
                                   "bp.create_project":("name", "description", "date_due"),
                                   "bp.show_project_data":("public_id",),
                                   "bp.modify_project":("public_id", "name", "description"),
                                   "bp.archive_project":("public_id",),
                                   "bp.create_task":("public_id", "name", "description", "date_due"),
                                   "bp.show_task_data":("public_id",),
                                   "bp.modify_task":("public_id", "name", "description", "date_due"),
                                   "bp.archive_task":("public_id",),
                                   "bp.move_task":("public_id", "progress"),
                                   "bp.create_subtask":("public_id", "name", "description"),
                                   "bp.modify_subtask":("public_id", "name", "description"),
                                   "bp.archive_subtask":("public_id",),
                                   "bp.complete_subtask":("public_id", "done")}

    def require_input(self):        
        required = {}
        action = request.endpoint

        for data in self.required_data_list[action]:
            if not request.json.get(data):
                result = ""

            elif data in ("first_name", "last_name"):
                result = request.json.get(data).title()

            elif data == "password" and action != "bp.login_user":
                result = generate_password_hash(request.json.get(data), method="sha256")

            else:
                result = request.json.get(data)

            required[data] = result

        return required
 
    def get_opened_entity(**kwargs):
        conditions = []
        entity = kwargs['entity']
        select = kwargs['select']
        
        for kwarg in kwargs:
            if kwarg not in ('entity', 'select', 'join') and hasattr(entity, kwarg):
                conditions.append(getattr(entity, kwarg) == kwargs[kwarg])

        query = entity.query.filter(db.and_(*conditions))

        if select == 'first':
            return query.first()
        
        if select == 'all':
            return query.all()

        if select == 'join':
            return entity.query.join(kwargs['join']).filter(db.and_(*conditions))
    
    def change_entity_values(**kwargs):
        entity = kwargs['entity']
        data = kwargs['data']

        for content in data:
            if content != "public_id":
                exist = Controller.get_opened_entity(entity=entity, content=data[content], archived=False, select='first')
            
                if hasattr(entity, content) and getattr(exist, content) != data[content] and data[content]:
                    setattr(entity, content, data[content])
                    db.session.commit()

                    return True
                
        return False
    
    def dispose_data(self):

        print("aw")