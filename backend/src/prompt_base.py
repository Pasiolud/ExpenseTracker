PROMPT_BASE = """Twoim zadaniem jest wyekstrahowanie produktów z tekstu przesłanego przez użytkownika i sformatowanie ich do czystej listy JSON.

### DANE WEJŚCIOWE:
1. Tekst użytkownika: [TUTAJ WKLEJ TEKST, NP. "Kupiłem 2 coca-cole oraz 1 srubokret"]
2. Lista dostępnych tagów: [TUTAJ WKLEJ LISTĘ TAGÓW W FORMACIE JSON]

### ZASADY PRZETWARZANIA:
1. Przeanalizuj tekst i zidentyfikuj każdą nazwę produktu oraz jego ilość.
2. Dla każdego produktu dobierz odpowiednie `id` z dostarczonej "Listy dostępnych tagów". 
3. Jeśli dany produkt nie pasuje do żadnego taga, pole `tag_ids` musi być pustą listą `[]`.
4. NIE twórz własnych tagów ani nowych ID. Używaj tylko tych dostarczonych.
5. Nazwy produktów w JSON powinny być w mianowniku liczby pojedynczej (np. "coca-cola" zamiast "coca-cole").

### FORMAT WYJŚCIOWY:
Zwróć TYLKO I WYŁĄCZNIE czysty kod JSON w formie tablicy obiektów, bez żadnego tekstu wstępnego, wyjaśnień ani podsumowań. Nie używaj znaczników markdown (```json).

Struktura obiektu:
{
  "name": (string),
  "amount": (integer),
  "tag_ids": (array of integers)
}

"""
