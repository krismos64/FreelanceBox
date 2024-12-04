import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "react-toastify";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

const Planning: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        toast.error("Token invalide. Veuillez vous reconnecter.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des événements:", error);

      const errorMessage = error.response
        ? error.response.data.message || "Une erreur s'est produite"
        : "Impossible de récupérer les événements";

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const validateEvent = (): boolean => {
    if (!newEvent.title.trim()) {
      toast.error("Le titre de l'événement est obligatoire.");
      return false;
    }
    if (!newEvent.start || !newEvent.end) {
      toast.error("Les dates de début et de fin sont obligatoires.");
      return false;
    }
    if (new Date(newEvent.start) >= new Date(newEvent.end)) {
      toast.error("La date de fin doit être après la date de début.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEvent()) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/api/events", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      fetchEvents();
      setNewEvent({ title: "", start: "", end: "", description: "" });
      toast.success("Événement ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
      toast.error(
        "Une erreur est survenue lors de la création de l'événement."
      );
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Événement supprimé avec succès !");
      fetchEvents(); // Recharge la liste des événements après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
      toast.error(
        "Une erreur est survenue lors de la suppression de l'événement."
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Planning</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale="fr"
          selectable
          selectMirror
          dayMaxEvents
          weekends
          firstDay={1} // Débute le calendrier le lundi
          events={events}
          select={(info) => {
            setNewEvent({
              title: "",
              start: format(info.start, "yyyy-MM-dd'T'HH:mm:ss"),
              end: format(info.end, "yyyy-MM-dd'T'HH:mm:ss"),
              description: "",
            });
            setShowModal(true);
          }}
          eventClick={(info) => {
            if (window.confirm("Voulez-vous supprimer cet événement ?")) {
              handleDeleteEvent(info.event.id);
            }
          }}
          height="auto"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Nouvel événement
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Titre
                </label>
                <input
                  id="title"
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label
                  htmlFor="start"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Début
                </label>
                <input
                  id="start"
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="end"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fin
                </label>
                <input
                  id="end"
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Enregistrer
                </button>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning;
