import json
import os
from typing import Dict, Any, List
from openai import OpenAI

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI-powered search for literary excerpts by theme/emotion
    Args: event with httpMethod, body containing search query
          context with request_id
    Returns: HTTP response with matching excerpts from literature
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    query = body_data.get('query', '').strip()
    
    if not query:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Query is required'}),
            'isBase64Encoded': False
        }
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'OpenAI API key not configured'}),
            'isBase64Encoded': False
        }
    
    client = OpenAI(api_key=api_key)
    
    excerpts_database = [
        {
            "text": "Любовь — это когда хочется петь и днем и ночью. Без гонорара и менеджера.",
            "author": "Фаина Раневская",
            "work": "Из дневников",
            "year": 1965,
            "theme": "любовь"
        },
        {
            "text": "Она вошла в его жизнь, как входят в дом, где живут давно: легко, без стука, сразу во все комнаты.",
            "author": "Эрих Мария Ремарк",
            "work": "Три товарища",
            "year": 1936,
            "theme": "любовь"
        },
        {
            "text": "Я тебя люблю — это значит, я желаю тебе добра.",
            "author": "Лев Толстой",
            "work": "Анна Каренина",
            "year": 1877,
            "theme": "любовь"
        },
        {
            "text": "Любить — значит видеть чудо, невидимое для других.",
            "author": "Франсуа Мориак",
            "work": "Терезa Дескейру",
            "year": 1927,
            "theme": "любовь"
        },
        {
            "text": "Смерть каждого человека умаляет и меня, ибо я един со всем Человечеством.",
            "author": "Джон Донн",
            "work": "По ком звонит колокол",
            "year": 1624,
            "theme": "философия"
        },
        {
            "text": "В одиночестве человек — либо святой, либо дьявол.",
            "author": "Роберт Бёртон",
            "work": "Анатомия меланхолии",
            "year": 1621,
            "theme": "одиночество"
        },
        {
            "text": "Одиночество прибавляет прелести вечеру, когда мы любим, и тяжести вечеру, когда мы не любим.",
            "author": "Жан де Лабрюйер",
            "work": "Характеры",
            "year": 1688,
            "theme": "одиночество"
        },
        {
            "text": "Счастье не в том, чтобы делать всегда, что хочешь, а в том, чтобы всегда хотеть того, что делаешь.",
            "author": "Лев Толстой",
            "work": "Дневники",
            "year": 1847,
            "theme": "счастье"
        },
        {
            "text": "Счастье — это когда тебя понимают.",
            "author": "Марк Твен",
            "work": "Письма с Земли",
            "year": 1909,
            "theme": "счастье"
        },
        {
            "text": "Печаль — это особое счастье, когда она смешана с тишиной природы.",
            "author": "Иван Бунин",
            "work": "Антоновские яблоки",
            "year": 1900,
            "theme": "печаль"
        },
        {
            "text": "Время — это ткань, из которой состоит жизнь.",
            "author": "Бенджамин Франклин",
            "work": "Альманах бедного Ричарда",
            "year": 1757,
            "theme": "время"
        },
        {
            "text": "Надежда — это единственное благо, общее всем людям; даже те, у кого нет ничего другого, обладают надеждой.",
            "author": "Фалес Милетский",
            "work": "Философские фрагменты",
            "year": -585,
            "theme": "надежда"
        },
        {
            "text": "Красота спасёт мир.",
            "author": "Фёдор Достоевский",
            "work": "Идиот",
            "year": 1869,
            "theme": "красота"
        },
        {
            "text": "Дружба — это когда люди разделяют твою радость и умножают твоё счастье.",
            "author": "Антуан де Сент-Экзюпери",
            "work": "Маленький принц",
            "year": 1943,
            "theme": "дружба"
        },
        {
            "text": "Свобода не в том, чтобы делать что хочешь, а в том, чтобы не делать того, чего не хочешь.",
            "author": "Жан-Жак Руссо",
            "work": "Общественный договор",
            "year": 1762,
            "theme": "свобода"
        }
    ]
    
    prompt = f"""Ты — эксперт по мировой литературе. У меня есть база отрывков из книг.

Пользователь ищет: "{query}"

Вот доступные отрывки (JSON):
{json.dumps(excerpts_database, ensure_ascii=False)}

Задача:
1. Проанализируй запрос пользователя и определи эмоциональный/тематический контекст
2. Найди ВСЕ релевантные отрывки из базы, которые соответствуют этому запросу
3. Отсортируй их по релевантности (самые подходящие первыми)
4. Верни список отрывков в JSON формате

Важно: 
- Учитывай синонимы и близкие понятия (любовь = влюблённость = романтика)
- Ищи по тексту отрывка, теме и смыслу
- Если запрос про эмоцию, ищи отрывки где эта эмоция описана
- Верни минимум 3-5 отрывков, если они есть

Формат ответа (только JSON, без markdown):
{{"excerpts": [список объектов из базы]}}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Ты — литературный поисковик. Отвечаешь только в JSON формате."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    
    ai_response = response.choices[0].message.content.strip()
    
    if ai_response.startswith('```json'):
        ai_response = ai_response[7:]
    if ai_response.startswith('```'):
        ai_response = ai_response[3:]
    if ai_response.endswith('```'):
        ai_response = ai_response[:-3]
    ai_response = ai_response.strip()
    
    result = json.loads(ai_response)
    excerpts = result.get('excerpts', [])
    
    for i, excerpt in enumerate(excerpts):
        excerpt['id'] = i + 1
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'query': query,
            'count': len(excerpts),
            'excerpts': excerpts
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }
