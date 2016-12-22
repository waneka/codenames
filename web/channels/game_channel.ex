defmodule Codenames.GameChannel do
  use Phoenix.Channel
  alias Codenames.{GameSupervisor, Game}
  intercept ["message"]

  def join("game:" <> room_id, _params, socket) do
    {:ok, assign(socket, :room_id, room_id)}
  end

  def handle_in("message", payload, socket) do
    "game:" <> topic = socket.topic

    GameSupervisor.find_or_create(topic)
    Game.add(topic, payload)

    broadcast! socket, "message", payload
    {:noreply, socket}
  end

  def handle_out("message", payload, socket) do
    if current_room?(socket.assigns[:room_id], socket.topic) do
      push socket, "message", payload
    end

    {:noreply,socket}
  end

  defp current_room?(room_id, "game:" <> sub_topic) do
    room_id == sub_topic
  end
end
